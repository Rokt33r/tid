import { prismyx, prismy } from 'prismy'
import { withErrorHandler } from './middlewares'
import { sessionMiddleware } from './selectors/sessionSelector'

const defaultMiddlewares = [sessionMiddleware, withErrorHandler]

export const p: typeof prismy = (
  selectors: any,
  handler: any,
  middlewares?: any
) => prismyx(selectors, handler, [...middlewares, ...defaultMiddlewares])
