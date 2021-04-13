"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    try {
      const {
        name,
        email,
        driver_license,
        password
      } = request.body;

      const createUser = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

      const newUser = await createUser.execute({
        name,
        email,
        driver_license,
        password,
        avatar: null
      });
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateUserController = CreateUserController;