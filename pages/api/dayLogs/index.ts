import { res } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { p } from '../../../lib/p'
import { bodySelector, authenticatedUserSelector } from '../../../lib/selectors'
import { createError } from 'prismy'
import { DayLog } from '../../../lib/models'

export const createDayLog = p(
  [authenticatedUserSelector, bodySelector],
  async (user, body) => {
    if (user == null) {
      throw createError(401, 'Unauthorized user')
    }

    const { date, title, content } = body
    const dayLog = await DayLog.create({
      date,
      title,
      content,
      userId: user.id
    })

    return res({ dayLog })
  }
)

export default methodRouter({
  post: createDayLog
})
