"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = void 0;
    this.cars = [];
  }

  async create(data) {
    const car = new _Car.Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }

  async list() {
    const allCars = this.cars;
    return allCars;
  }

  async findByLicensePlate(license_plate) {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name
  }) {
    const allCars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || name && car.name === name || category_id && car.category_id === category_id) {
        return car;
      }

      return null;
    });
    return allCars;
  }

  async findById(id) {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

  async updateCarAvailability(id, available) {
    const car = this.cars.find(car => car.id === id);
    Object.assign(car, {
      available
    });
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;