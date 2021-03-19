import express, { json } from 'express'

import { categoriesRoutes } from './routes/categories.routes'

const app = express()

app.use(json())

app.use('/categories', categoriesRoutes)

const port = 3333

app.listen(port, () => console.log(`Server is running on port:${port}`))
