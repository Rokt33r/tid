import { prismy, res, createWithErrorHandler, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import PostModel from '../../lib/models/Post'
import { bodySelector } from '../../lib/selectors/bodySelector'

const withErrorHandler = createWithErrorHandler({ dev: true, json: true })

export default methodRouter({
  get: prismy(
    [],
    async () => {
      return res({
        message: 'hello',
      })
    },
    [withErrorHandler]
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
