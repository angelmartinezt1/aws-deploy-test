import express from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import notFoundMiddleware from './middlewares/notFoundMiddleware.js'
import requestTimerMiddleware from './middlewares/requestTimerMiddleware.js'

const app = express()

app.use(requestTimerMiddleware)
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(corsMiddleware)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
