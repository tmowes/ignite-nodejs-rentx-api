"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationController {
  async handle(request, response) {
    try {
      const {
        id
      } = request.params;
      const {
        specifications_id
      } = request.body;

      const createCarSpecification = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

      const newCarWithSpecifications = await createCarSpecification.execute({
        car_id: id,
        specifications_id
      });
      return response.status(200).json(newCarWithSpecifications);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;