import { Router } from 'express'


import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListAllSpecificationsController } from '@modules/cars/useCases/listAllSpecifications/ListAllSpecificationsController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listAllSpecificationsController = new ListAllSpecificationsController()

specificationsRoutes.use(ensureAuthenticated)

specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listAllSpecificationsController.handle)
