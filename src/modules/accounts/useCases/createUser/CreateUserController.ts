import { Response, Request } from "express";
import { container } from 'tsyringe'

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        driver_license,
        password,
      } = request.body

      const createUser = container.resolve(CreateUserUseCase)

      const newUser = await createUser.execute({
        name,
        email,
        driver_license,
        password,
        avatar: null
      })

      return response.status(201).json(newUser)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
