import { Response, Request } from "express";
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;
      const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
      const newCategory = await createSpecificationUseCase.execute({ name, description })
      return response.status(201).json(newCategory)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
