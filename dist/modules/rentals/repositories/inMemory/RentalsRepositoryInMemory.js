"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = void 0;
    this.rentals = [];
  }

  async create(data) {
    const rental = new _Rental.Rental();
    Object.assign(rental, { ...data,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rentalByCar = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    return rentalByCar;
  }

  async findOpenRentalByUser(user_id) {
    const rentalByUser = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    return rentalByUser;
  }

  async findRentalByUser(user_id) {
    const rentalsByUser = this.rentals.filter(rental => rental.user_id === user_id);
    return rentalsByUser;
  }

  async findById(id) {
    const rentalByUser = this.rentals.find(rental => rental.id === id && !rental.end_date);
    return rentalByUser;
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;