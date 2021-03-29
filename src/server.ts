import 'reflect-metadata'
import express, { json, Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import AppError from './errors/AppError'
import { appRoutes } from './routes'
import swaggerFile from './swagger.json'
import './database'
import './shared/container'

const app = express()

app.use(json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

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
  },
)

const port = 3333

app.listen(port, () => console.log(`Server is running on port: ${port}`))
