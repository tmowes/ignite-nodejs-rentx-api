"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = void 0;
    this.categories = [];
  }

  async create(data) {
    const category = new _Category.Category();
    Object.assign(category, data);
    this.categories.push(category);
    return category;
  }

  async list() {
    const allCategories = this.categories;
    return allCategories;
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;