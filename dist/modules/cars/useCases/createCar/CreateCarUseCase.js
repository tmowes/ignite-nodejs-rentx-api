"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(data) {
    const carExists = await this.carsRepository.findByLicensePlate(data.license_plate);

    if (carExists) {
      throw new _AppError.default('Car already exists!', 400);
    }

    const newCar = this.carsRepository.create({ ...data
    });
    return newCar;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;