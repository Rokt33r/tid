import { res } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { p } from '../../lib/p'
import { authenticatedUserSelector } from '../../lib/selectors'
import { DayLog } from '../../lib/models'

export default methodRouter({
  get: p([authenticatedUserSelector], async (user) => {
    let dayLogs = null
    if (user != null) {
      dayLogs = await DayLog.findAll({
        where: {
          userId: user.id
        }
      })
    }

    return res({
      message: 'hello',
      user,
      dayLogs
    })
  })
})
