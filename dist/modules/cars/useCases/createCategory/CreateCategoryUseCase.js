"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new _AppError.default('Category already exists!', 400);
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      description
    });
    return newCategory;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;