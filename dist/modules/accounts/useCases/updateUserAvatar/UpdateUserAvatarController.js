"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    try {
      const {
        id
      } = request.user;
      const avatar = request.file.filename;

      const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

      const updatedUser = await updateUserAvatar.execute({
        user_id: id,
        avatar_file: avatar
      });
      return response.status(204).json(updatedUser);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;