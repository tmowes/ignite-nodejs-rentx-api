import express, { json } from 'express'
import swaggerUI from 'swagger-ui-express'

import { appRoutes } from './routes'
import swaggerFile from './swagger.json'

const app = express()

app.use(json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(appRoutes)

const port = 3333

app.listen(port, () => console.log(`Server is running on port: ${port}`))
