"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

class CreateCategoryController {
  async handle(request, response) {
    try {
      const {
        name,
        description
      } = request.body;

      const createCategory = _tsyringe.container.resolve(_CreateCategoryUseCase.CreateCategoryUseCase);

      const newCategory = await createCategory.execute({
        name,
        description
      });
      return response.status(201).json(newCategory);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateCategoryController = CreateCategoryController;