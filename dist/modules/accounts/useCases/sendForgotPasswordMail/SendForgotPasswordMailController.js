"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

class SendForgotPasswordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    try {
      const sendForgotPasswordMail = _tsyringe.container.resolve(_SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

      const forgot_password_token = await sendForgotPasswordMail.execute({
        email
      });
      return response.status(201).json(forgot_password_token);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;