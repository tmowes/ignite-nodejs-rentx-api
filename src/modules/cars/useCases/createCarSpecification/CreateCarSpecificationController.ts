import { Response, Request } from "express";
import { container } from 'tsyringe'

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const { specifications_id } = request.body

      const createCarSpecification = container.resolve(CreateCarSpecificationUseCase)

      const newCarWithSpecifications = await createCarSpecification.execute({ car_id: id, specifications_id })

      return response.status(200).json(newCarWithSpecifications)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
