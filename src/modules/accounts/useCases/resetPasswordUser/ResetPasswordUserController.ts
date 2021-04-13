import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

export class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body
    try {
      const resetPasswordUser = container.resolve(ResetPasswordUserUseCase)
      const updateUser = await resetPasswordUser.execute({
        token: String(token),
        password,
      })
      return response.status(200).json(updateUser)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
