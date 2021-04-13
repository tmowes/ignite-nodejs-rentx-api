"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const minimumRentalDays = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new _AppError.default('Rental not found!', 404);
    }

    const rentalByUser = await this.rentalsRepository.findRentalByUser(user_id);

    if (!rentalByUser) {
      throw new _AppError.default('Rental for this user was not found!', 404);
    }

    const carInRental = await this.carsRepository.findById(rental.car_id);

    if (!carInRental) {
      throw new _AppError.default('Car in rental not found!', 404);
    }

    const carDailyAmount = carInRental.daily_rate;
    const carFineAmount = carInRental.fine_amount;
    const rentalDelayInDays = this.dateProvider.compareInDays(rental.expected_return_date, this.dateProvider.dateNow());
    let rentalDailyInDays = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
    if (rentalDailyInDays <= 0) rentalDailyInDays = minimumRentalDays;
    let total = 0;

    if (rentalDelayInDays > 0) {
      const calculateFineAmount = rentalDelayInDays * carFineAmount;
      total = calculateFineAmount;
    }

    total += rentalDailyInDays * carDailyAmount;
    Object.assign(rental, {
      end_date: this.dateProvider.dateNow(),
      total
    });
    const rentalEnd = await this.rentalsRepository.create(rental);
    await this.carsRepository.updateCarAvailability(rental.car_id, true);
    return rentalEnd;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;