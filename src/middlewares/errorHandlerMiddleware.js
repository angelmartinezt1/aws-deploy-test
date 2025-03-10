import { formatResponse } from '../utils/formatResponse.js'

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  formatResponse(res, statusCode, false, null, message, null,
    process.env.NODE_ENV !== 'production' ? { stack: err.stack } : null
  )
}

export default errorHandlerMiddleware
