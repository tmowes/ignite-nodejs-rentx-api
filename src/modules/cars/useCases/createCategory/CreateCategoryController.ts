import { Response, Request } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;
      const newCategory = this.createCategoryUseCase.execute({ name, description })
      return response.status(201).json(newCategory)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
