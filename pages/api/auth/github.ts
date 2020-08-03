import { prismy, createWithErrorHandler, querySelector, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { User, GithubUserProfile } from '../../../lib/models'
import {
  sessionMiddleware,
  sessionSelector,
} from '../../../lib/selectors/sessionSelector'
import { Octokit } from '@octokit/rest'
import { createOAuthAppAuth } from '@octokit/auth-oauth-app'
import { TokenAuthentication } from '@octokit/auth-oauth-app/dist-types/types'

const withErrorHandler = createWithErrorHandler({ dev: true, json: true })

export default methodRouter({
  get: prismy(
    [querySelector, sessionSelector],
    async (query, session) => {
      const { code } = query

      const auth = createOAuthAppAuth({
        clientId: '28d9036cc07644ae74c3',
        clientSecret: '6856bd87bb2afb9c82eccaf64dfb03e0728ee433',
        code: code as string,
      })
      const appAuthentication = await auth({
        type: 'token',
      })
      const token = (appAuthentication as TokenAuthentication).token

      const octokit = new Octokit({
        auth: token,
      })

      const githubUser = await octokit.users.getAuthenticated()

      const { login: userName, id: githubId } = githubUser.data

      let githubUserProfile = await GithubUserProfile.findOne({
        where: {
          githubId: githubId.toString(),
        },
      })
      let user: User

      if (githubUserProfile == null) {
        user = await User.create({
          name: userName,
        })

        githubUserProfile = await GithubUserProfile.create({
          githubId,
          githubToken: token,
          UserId: user.id,
        })
      } else {
        user = await User.findOne({
          where: {
            id: githubUserProfile.UserId,
          },
        })
        user.name = userName
        await user.save()
        githubUserProfile.githubToken = token
        await githubUserProfile.save()
      }
      session.data = {
        ...session.data,
        userId: user.id,
      }

      return redirect('/')
    },
    [sessionMiddleware, withErrorHandler]
  ),
})
