import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase'

export class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user
      const listRentalsByUser = container.resolve(ListRentalsByUserUseCase)
      const rentalsList = await listRentalsByUser.execute({ user_id })
      return response.status(200).json(rentalsList)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
