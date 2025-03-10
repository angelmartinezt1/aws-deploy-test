import { formatResponse } from '../utils/formatResponse.js'

const notFoundMiddleware = (req, res) => {
  formatResponse(res, 404, false, null, `Cannot ${req.method} ${req.path}`, null, {
    code: 404,
    path: req.originalUrl,
    method: req.method
  })
}

export default notFoundMiddleware
