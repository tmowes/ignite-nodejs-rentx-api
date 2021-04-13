"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUseCase = require("./ProfileUserUseCase");

class ProfileUserController {
  async handle(request, response) {
    try {
      const {
        id
      } = request.user;

      const profileUser = _tsyringe.container.resolve(_ProfileUserUseCase.ProfileUserUseCase);

      const userProfile = await profileUser.execute({
        id
      });
      return response.status(200).json(userProfile);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ProfileUserController = ProfileUserController;