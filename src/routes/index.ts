import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'

export const appRoutes = Router()

appRoutes.use('/categories', categoriesRoutes)
appRoutes.use('/specifications', specificationsRoutes)
