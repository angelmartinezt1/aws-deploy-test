export const formatResponse = (res, status = 200, success = true, data = null, message = '', pagination = null, validationErrors = null) => {
  const executionTime = res.req.startTime ? `${Date.now() - res.req.startTime} ms` : 'N/A'

  const response = {
    metadata: {
      success,
      message: message || (success ? 'Request completed successfully' : 'There was an error'),
      timestamp: new Date().toISOString(),
      executionTime
    },
    data,
    validationErrors: validationErrors || null,
    pagination: pagination || {}
  }

  return res.status(status).json(response)
}
