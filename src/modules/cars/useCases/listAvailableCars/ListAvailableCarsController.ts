
import { Response, Request } from "express";
import { container } from 'tsyringe'

import { ListAvailableCarsDTO } from "@modules/cars/dtos/ListAvailableCarsDTO";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data: ListAvailableCarsDTO = request.query
      const listAvailableCars = container.resolve(ListAvailableCarsUseCase)
      const availableCars = await listAvailableCars.execute(data)
      return response.status(200).json(availableCars)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
