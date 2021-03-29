import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListAllSpecificationsController } from '../modules/cars/useCases/listAllSpecifications/ListAllSpecificationsController'


export const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listAllSpecificationsController = new ListAllSpecificationsController()

specificationsRoutes.use(ensureAuthenticated)



specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listAllSpecificationsController.handle)
