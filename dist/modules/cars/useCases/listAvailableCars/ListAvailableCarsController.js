"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    try {
      const data = request.query;

      const listAvailableCars = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

      const availableCars = await listAvailableCars.execute(data);
      return response.status(200).json(availableCars);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;