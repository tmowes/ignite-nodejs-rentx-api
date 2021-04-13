"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create(data) {
    const category = this.repository.create(data);
    await this.repository.save(category);
    return category;
  }

  async list() {
    const allCategories = await this.repository.find();
    return allCategories;
  }

  async findByName(name) {
    const category = await this.repository.findOne({
      where: {
        name
      }
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;