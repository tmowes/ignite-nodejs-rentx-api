import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body
      const authenticateUser = container.resolve(AuthenticateUserUseCase)
      const token = await authenticateUser.execute({ email, password })
      return response.status(200).json(token)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
