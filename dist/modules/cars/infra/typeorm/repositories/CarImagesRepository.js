"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../entities/CarImage");

class CarImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }

  async create(data) {
    const carImage = this.repository.create(data);
    await this.repository.save(carImage);
    return carImage;
  }

}

exports.CarImagesRepository = CarImagesRepository;