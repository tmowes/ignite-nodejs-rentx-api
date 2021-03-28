import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListAllSpecificationsController } from '../modules/cars/useCases/listAllSpecifications/ListAllSpecificationsController'


export const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listAllSpecificationsController = new ListAllSpecificationsController()

specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listAllSpecificationsController.handle)
