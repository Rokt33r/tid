import { PrismyPureMiddleware, middlewarex, res } from 'prismy'
export { createError } from 'micro'

interface WithErrorHandlerOptions {
  dev?: boolean
  json?: boolean
}

function createWithErrorHandler({
  dev = false,
  json = false
}: WithErrorHandlerOptions = {}): PrismyPureMiddleware {
  return middlewarex([], (next) => async () => {
    try {
      return await next()
    } catch (error) {
      console.error(error)
      const statusCode = error.statusCode || error.status || 500
      const message = dev
        ? error.stack
        : statusCode === 500
        ? 'Internal Server Error'
        : error.message

      return json ? res({ message }, statusCode) : res(message, statusCode)
    }
  })
}

export const withErrorHandler = createWithErrorHandler({
  dev: true,
  json: true
})
