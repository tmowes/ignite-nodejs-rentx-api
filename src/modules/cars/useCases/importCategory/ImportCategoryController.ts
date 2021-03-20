import { Response, Request } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request

      const newCategories = await this.importCategoryUseCase.execute({ file })

      return response.status(201).json(newCategories)

    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
