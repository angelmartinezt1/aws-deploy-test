import express from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import notFoundMiddleware from './middlewares/notFoundMiddleware.js'
import requestTimerMiddleware from './middlewares/requestTimerMiddleware.js'
import { formatResponse } from './utils/formatResponse.js'

const app = express()

app.use(requestTimerMiddleware)
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(corsMiddleware)

// Health check endpoint
app.get('/api/health', (req, res) => {
  formatResponse(res, 200, true, { status: 'OK' }, 'Service is healthy')
})

// Health check endpoint
app.get('/github', (req, res) => {
  formatResponse(res, 200, true, { status: 'OK' }, 'THola Nati')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
