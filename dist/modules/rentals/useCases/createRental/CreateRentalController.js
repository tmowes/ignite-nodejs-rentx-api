"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  async handle(request, response) {
    try {
      const {
        id
      } = request.user;
      const {
        car_id,
        expected_return_date
      } = request.body;

      const createRental = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

      const newRental = await createRental.execute({
        user_id: id,
        car_id,
        expected_return_date
      });
      return response.status(201).json(newRental);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateRentalController = CreateRentalController;