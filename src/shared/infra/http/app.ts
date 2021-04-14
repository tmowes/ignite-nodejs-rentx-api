import 'reflect-metadata'
import 'dotenv/config'
import upload from '@config/upload'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import cors from 'cors'
import express, { json, Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import '@shared/container'
import AppError from '@shared/errors/AppError'
import createConnection from '@shared/infra/typeorm'

import swaggerFile from '../../../swagger.json'
import { rateLimiter } from './middlewares/rateLimiter'
import { appRoutes } from './routes'

createConnection()
const app = express()

app.use(cors())

app.use(json())

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))

app.use(appRoutes)

app.use(Sentry.Handlers.errorHandler())
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  }
)

export { app }
