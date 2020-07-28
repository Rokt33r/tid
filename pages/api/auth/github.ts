import { prismy, res, createWithErrorHandler, querySelector } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import got from 'got'
import User from '../../../lib/models/User'

const withErrorHandler = createWithErrorHandler({ dev: true, json: true })

export default methodRouter({
  get: prismy(
    [querySelector],
    async (query) => {
      const { code } = query

      const { access_token } = await got(
        'https://github.com/login/oauth/access_token',
        {
          searchParams: {
            client_id: '28d9036cc07644ae74c3',
            client_secret: '6856bd87bb2afb9c82eccaf64dfb03e0728ee433',
            code: code as string,
          },
        }
      ).json()

      const githubUser = await got('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${access_token}`,
        },
      }).json()

      const { login: userName, id: githubId } = githubUser as any

      let user = await User.findOne({
        where: {
          githubId: githubId.toString(),
        },
      })

      if (user == null) {
        user = await User.create({
          name: userName,
          githubId,
          githubToken: access_token,
        })
      } else {
        user.name = userName
        user.githubToken = access_token
        await user.save()
      }

      return res({
        user,
      })
    },
    [withErrorHandler]
  ),
})
