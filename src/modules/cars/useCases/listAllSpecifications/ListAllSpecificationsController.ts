import { Request, Response } from "express";

import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

export class ListAllSpecificationsController {
  constructor(private listAllSpecificationsUseCase: ListAllSpecificationsUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const allUsers = this.listAllSpecificationsUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
