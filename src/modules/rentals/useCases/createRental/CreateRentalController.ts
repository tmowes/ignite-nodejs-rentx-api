import { Response, Request } from "express";
import { container } from 'tsyringe'

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user
      const { car_id, expected_return_date } = request.body
      const createRental = container.resolve(CreateRentalUseCase)
      const newRental = await createRental.execute({ user_id: id, car_id, expected_return_date })
      return response.status(201).json(newRental)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
