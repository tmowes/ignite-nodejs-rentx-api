import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

export class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    try {
      const sendForgotPasswordMail = container.resolve(
        SendForgotPasswordMailUseCase
      )
      const forgot_password_token = await sendForgotPasswordMail.execute({
        email,
      })

      return response.status(201).json(forgot_password_token)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
