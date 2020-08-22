import { createDayLog } from '../../pages/api/dayLogs'
import { truncateAllTables } from '../../lib/db'
import { User, DayLog } from '../../lib/models'

describe('createDayLog', () => {
  beforeAll(async () => {
    await truncateAllTables()
  })

  it('should throw 401 error', async () => {
    expect.assertions(1)

    try {
      await createDayLog.handler(null, {})
    } catch (error) {
      expect(error).toMatchObject({ statusCode: 401 })
    }
  })

  it('create a dayLog', async () => {
    const user = await User.create({
      name: 'testUser'
    })

    const body = {
      date: '1993-05-26',
      title: 'Hello',
      content: 'New world!',
      userId: user.id
    }

    const result = await createDayLog.handler(user, body)

    expect(result.body).toMatchObject({
      dayLog: {
        id: expect.any(Number),
        ...body,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }
    })

    const dayLog = await DayLog.findOne({
      where: {
        userId: user.id
      }
    })

    expect(dayLog).toMatchObject({
      ...body,
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})
