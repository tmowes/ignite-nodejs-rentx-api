"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllCategoriesUseCase = void 0;

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListAllCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllCategoriesUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const allCategories = await this.categoriesRepository.list();
    return allCategories;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAllCategoriesUseCase = ListAllCategoriesUseCase;