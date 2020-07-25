import {
  prismy,
  res,
  createWithErrorHandler,
  SyncSelector,
  redirect,
} from 'prismy'
import { methodRouter } from 'prismy-method-router'
import PostModel from '../../lib/models/Post'

const withErrorHandler = createWithErrorHandler({ dev: true, json: true })
const bodySelector: SyncSelector<any> = (context) => {
  return (context.req as any).body
}

export default methodRouter({
  get: prismy(
    [],
    async () => {
      const posts = await PostModel.findAll({})
      console.log(posts)
      return res(
        [
          '<!DOCTYPE html>',
          '<body>',
          '<ul>',
          ...posts.map((post) => {
            return `<li>${post.title}</li>`
          }),
          '</ul>',
          '<form action="/api" method="post">',
          '<input name="title">',
          '<input name="content">',
          '<button type="submit">Send</button>',
          `<pre><code>${JSON.stringify(posts, null, 2)}</code></pre>`,
          '</form>',
          '</body>',
        ].join('')
      )
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
      console.log(post._attributes.title)

      return redirect('/api')
    },
    [withErrorHandler]
  ),
})
