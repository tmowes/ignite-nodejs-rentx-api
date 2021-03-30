import { Request, Response } from "express";
import { container } from 'tsyringe'

import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

export class ListAllSpecificationsController {

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const listAllSpecificationsUseCase = container.resolve(ListAllSpecificationsUseCase)
      const allUsers = await listAllSpecificationsUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
