"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserUseCase = void 0;

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListRentalsByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRentalsByUserUseCase {
  constructor(rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute({
    user_id
  }) {
    const rentalByUser = await this.rentalsRepository.findRentalByUser(user_id);

    if (!rentalByUser) {
      throw new _AppError.default('Rental with this user not found!', 404);
    }

    return rentalByUser;
  }

}) || _class) || _class) || _class) || _class);
exports.ListRentalsByUserUseCase = ListRentalsByUserUseCase;