import { querySelector, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { Octokit } from '@octokit/rest'
import { createOAuthAppAuth } from '@octokit/auth-oauth-app'
import { TokenAuthentication } from '@octokit/auth-oauth-app/dist-types/types'
import { p } from '../../../lib/p'
import { User, GithubUserProfile } from '../../../lib/models'
import { sessionSelector } from '../../../lib/selectors'

export const authenticateUser = p(
  [querySelector, sessionSelector],
  async (query, session) => {
    const { code } = query
    const auth = createOAuthAppAuth({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      code: code as string
    })

    const tokenAuthentication = await auth({ type: 'token' })
    const token = (tokenAuthentication as TokenAuthentication).token
    console.log(333, token)
    const octokit = new Octokit({ auth: token })

    const githubUser = await octokit.users.getAuthenticated()
    const { login: userName, id: githubId } = githubUser.data

    let githubUserProfile = await GithubUserProfile.findOne({
      where: {
        githubId: String(githubId)
      }
    })
    let user: User

    if (githubUserProfile == null) {
      user = await User.create({
        name: userName
      })
      githubUserProfile = await GithubUserProfile.create({
        githubId: String(githubId),
        githubToken: token,
        userId: user.id
      })
    } else {
      user = await User.findOne({
        where: {
          id: githubUserProfile.userId
        }
      })
      githubUserProfile.githubToken = token
      user.name = userName
    }

    await user.save()
    await githubUserProfile.save()

    session.data = {
      ...session.data,
      userId: user.id
    }

    return redirect('/')
  }
)

export default methodRouter({
  get: authenticateUser
})
