"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _ListAllCategoriesUseCase = require("./ListAllCategoriesUseCase");

class ListAllCategoriesController {
  async handle(_request, response) {
    try {
      const listAllCategoriesUseCase = _tsyringe.container.resolve(_ListAllCategoriesUseCase.ListAllCategoriesUseCase);

      const allUsers = await listAllCategoriesUseCase.execute();
      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

}

exports.ListAllCategoriesController = ListAllCategoriesController;