import 'reflect-metadata'
import 'dotenv/config'
import upload from '@config/upload'
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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))

app.use(appRoutes)

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
