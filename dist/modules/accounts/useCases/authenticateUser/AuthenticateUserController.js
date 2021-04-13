"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    try {
      const {
        email,
        password
      } = request.body;

      const authenticateUser = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

      const token = await authenticateUser.execute({
        email,
        password
      });
      return response.status(200).json(token);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.AuthenticateUserController = AuthenticateUserController;