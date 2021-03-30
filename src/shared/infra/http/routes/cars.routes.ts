import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

export const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post('/', createCarController.handle)
