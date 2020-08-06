import { res } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { p } from '../../lib/p'
import { sessionSelector } from '../../lib/selectors/sessionSelector'
import { User } from '../../lib/models'

export default methodRouter({
  get: p(
    [sessionSelector],
    async (session) => {
      const { userId } = session.data || {}

      const user = isNaN(parseInt(userId, 10))
        ? null
        : await User.findOne({
            where: {
              id: parseInt(userId, 10)
            }
          })

      return res({
        message: 'hello',
        user
      })
    },
    []
  )
})
