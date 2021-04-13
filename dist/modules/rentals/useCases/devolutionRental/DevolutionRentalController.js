"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionRentalController {
  async handle(request, response) {
    try {
      const {
        id: user_id
      } = request.user;
      const {
        id
      } = request.params;

      const devolutionRental = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

      const newRental = await devolutionRental.execute({
        id,
        user_id
      });
      return response.status(200).json(newRental);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.DevolutionRentalController = DevolutionRentalController;