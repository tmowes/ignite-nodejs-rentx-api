import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body
      const createCategory = container.resolve(CreateCategoryUseCase)
      const newCategory = await createCategory.execute({ name, description })
      return response.status(201).json(newCategory)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
