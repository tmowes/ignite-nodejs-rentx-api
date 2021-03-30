import { Response, Request } from "express";
import { container } from 'tsyringe'

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      } = request.body;

      const createCar = container.resolve(CreateCarUseCase)

      const newCar = await createCar.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      })

      return response.status(201).json(newCar)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
