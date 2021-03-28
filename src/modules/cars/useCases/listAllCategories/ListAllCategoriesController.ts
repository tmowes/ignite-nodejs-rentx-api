import { Request, Response } from "express";
import { container } from 'tsyringe'

import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

export class ListAllCategoriesController {

  async handle(_request: Request, response: Response): Promise<Response> {
    try {

      const listAllCategoriesUseCase = container.resolve(ListAllCategoriesUseCase)
      const allUsers = await listAllCategoriesUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
