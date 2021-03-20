import { Router } from 'express'

import { createSpecificationController } from '../modules/cars/useCases/createSpecification'
import { listAllSpecificationsController } from '../modules/cars/useCases/listAllSpecifications'

export const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) =>
  createSpecificationController.handle(request, response)
)

specificationsRoutes.get('/', (request, response) =>
  listAllSpecificationsController.handle(request, response)
)
