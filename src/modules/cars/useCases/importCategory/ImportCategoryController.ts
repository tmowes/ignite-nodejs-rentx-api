import { Response, Request } from "express";
import { container } from 'tsyringe'

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
      const newCategories = await importCategoryUseCase.execute({ file })
      return response.status(201).json(newCategories)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
