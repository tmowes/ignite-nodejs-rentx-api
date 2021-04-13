"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create(data) {
    const rental = this.repository.create(data);
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rentalOpenByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return rentalOpenByCar;
  }

  async findOpenRentalByUser(user_id) {
    const rentalOpenByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return rentalOpenByUser;
  }

  async findRentalByUser(user_id) {
    const rentalsOpenByUser = await this.repository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return rentalsOpenByUser;
  }

  async findById(id) {
    const rentalById = await this.repository.findOne(id);
    return rentalById;
  }

}

exports.RentalsRepository = RentalsRepository;