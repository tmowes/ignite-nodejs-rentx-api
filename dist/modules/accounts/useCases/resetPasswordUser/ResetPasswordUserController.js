"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUserUseCase = require("./ResetPasswordUserUseCase");

class ResetPasswordUserController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    try {
      const resetPasswordUser = _tsyringe.container.resolve(_ResetPasswordUserUseCase.ResetPasswordUserUseCase);

      const updateUser = await resetPasswordUser.execute({
        token: String(token),
        password
      });
      return response.status(200).json(updateUser);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ResetPasswordUserController = ResetPasswordUserController;