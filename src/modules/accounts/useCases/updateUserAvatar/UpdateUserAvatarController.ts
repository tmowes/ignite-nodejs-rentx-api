import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user

      const avatar = request.file.filename

      const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase)

      const updatedUser = await updateUserAvatar.execute({
        user_id: id,
        avatar_file: avatar,
      })

      return response.status(204).json(updatedUser)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
