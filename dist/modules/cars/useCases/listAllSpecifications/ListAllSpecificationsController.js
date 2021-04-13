"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllSpecificationsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAllSpecificationsUseCase = require("./ListAllSpecificationsUseCase");

class ListAllSpecificationsController {
  async handle(_request, response) {
    try {
      const listAllSpecificationsUseCase = _tsyringe.container.resolve(_ListAllSpecificationsUseCase.ListAllSpecificationsUseCase);

      const allUsers = await listAllSpecificationsUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

}

exports.ListAllSpecificationsController = ListAllSpecificationsController;