import { Request, Response } from "express";

import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

export class ListAllCategoriesController {
  constructor(private listAllCategoriesUseCase: ListAllCategoriesUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const allUsers = this.listAllCategoriesUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
