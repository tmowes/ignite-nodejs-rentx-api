"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create(data) {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async list() {
    const allCars = await this.repository.find();
    return allCars;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });
    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name
  }) {
    const carsQuery = this.repository.createQueryBuilder('c').where('available = :available', {
      available: true
    });

    if (name) {
      carsQuery.andWhere('c.name = :name', {
        name
      });
    }

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateCarAvailability(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;