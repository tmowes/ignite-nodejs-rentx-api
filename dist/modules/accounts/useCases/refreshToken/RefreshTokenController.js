"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;

var _tsyringe = require("tsyringe");

var _RefreshTokenUseCase = require("./RefreshTokenUseCase");

class RefreshTokenController {
  async handle(request, response) {
    try {
      const token = request.body.token || request.headers['x-access-token'] || request.query.token;

      const refreshToken = _tsyringe.container.resolve(_RefreshTokenUseCase.RefreshTokenUseCase);

      const refresh_token = await refreshToken.execute({
        token
      });
      return response.status(200).json(refresh_token);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.RefreshTokenController = RefreshTokenController;