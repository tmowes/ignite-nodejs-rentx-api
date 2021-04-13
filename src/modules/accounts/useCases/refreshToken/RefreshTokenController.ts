import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const token =
        request.body.token ||
        request.headers['x-access-token'] ||
        request.query.token
      const refreshToken = container.resolve(RefreshTokenUseCase)
      const refresh_token = await refreshToken.execute({ token })
      return response.status(200).json(refresh_token)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
