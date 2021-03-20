import { Response, Request } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;
      const newCategory = this.createSpecificationUseCase.execute({ name, description })
      return response.status(201).json(newCategory)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
