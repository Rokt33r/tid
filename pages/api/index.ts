import { prismy, res, createWithErrorHandler, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import PostModel from '../../lib/models/Post'
import { bodySelector } from '../../lib/selectors/bodySelector'
import {
  sessionSelector,
  sessionMiddleware,
} from '../../lib/selectors/sessionSelector'
import User from '../../lib/models/User'

const withErrorHandler = createWithErrorHandler({ dev: true, json: true })

export default methodRouter({
  get: prismy(
    [sessionSelector],
    async (session) => {
      const { userId } = session.data || {}

      const user = isNaN(parseInt(userId, 10))
        ? null
        : await User.findOne({
            where: {
              id: parseInt(userId, 10),
            },
          })

      return res({
        message: 'hello',
        user,
      })
    },
    [withErrorHandler, sessionMiddleware]
  ),
  post: prismy(
    [bodySelector],
    async (body) => {
      const post = await PostModel.create({
        title: body.title,
        content: body.content,
      })

      return redirect('/api')
    },
    [withErrorHandler]
  ),
})
