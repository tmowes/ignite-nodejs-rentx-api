import { Router } from 'express'

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

export const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()


authenticateRoutes.post('/sessions', authenticateUserController.handle)
