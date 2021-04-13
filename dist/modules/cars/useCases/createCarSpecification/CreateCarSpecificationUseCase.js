"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationUseCase = void 0;

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _ISpecificationsRepository = require("../../repositories/ISpecificationsRepository");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCarSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SpecificationsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _ISpecificationsRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationsRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationUseCase {
  constructor(carsRepository, specificationsRepository) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }

  async execute({
    car_id,
    specifications_id
  }) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new _AppError.default('Car not found', 400);
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);
    Object.assign(carExists, {
      specifications
    });
    await this.carsRepository.create(carExists);
    return carExists;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;