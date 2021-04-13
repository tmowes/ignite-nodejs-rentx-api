import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ProfileUserUseCase } from './ProfileUserUseCase'

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user
      const profileUser = container.resolve(ProfileUserUseCase)
      const userProfile = await profileUser.execute({ id })
      return response.status(200).json(userProfile)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
