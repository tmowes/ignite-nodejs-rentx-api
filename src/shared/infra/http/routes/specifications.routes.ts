import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListAllSpecificationsController } from '@modules/cars/useCases/listAllSpecifications/ListAllSpecificationsController'

import { ensureAdmin, ensureAuthenticated } from '../middlewares'

export const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listAllSpecificationsController = new ListAllSpecificationsController()

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

specificationsRoutes.get('/', listAllSpecificationsController.handle)
