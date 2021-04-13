"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  async handle(request, response) {
    try {
      const {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      } = request.body;

      const createCar = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

      const newCar = await createCar.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      });
      return response.status(201).json(newCar);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateCarController = CreateCarController;