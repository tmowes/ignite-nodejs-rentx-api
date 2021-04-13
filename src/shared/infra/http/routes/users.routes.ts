import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const usersRoutes = Router()
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

const uploadAvatar = multer(uploadConfig)

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)
