"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUserController {
  async handle(request, response) {
    try {
      const {
        id: user_id
      } = request.user;

      const listRentalsByUser = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

      const rentalsList = await listRentalsByUser.execute({
        user_id
      });
      return response.status(200).json(rentalsList);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;