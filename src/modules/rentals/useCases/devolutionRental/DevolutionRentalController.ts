import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user
      const { id } = request.params
      const devolutionRental = container.resolve(DevolutionRentalUseCase)
      const newRental = await devolutionRental.execute({ id, user_id })
      return response.status(200).json(newRental)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
