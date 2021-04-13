"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepositoryInMemory = void 0;

var _CarImage = require("../../infra/typeorm/entities/CarImage");

class CarImagesRepositoryInMemory {
  constructor() {
    this.carImages = void 0;
    this.carImages = [];
  }

  async create(data) {
    const carImage = new _CarImage.CarImage();
    Object.assign(carImage, data);
    this.carImages.push(carImage);
    return carImage;
  }

}

exports.CarImagesRepositoryInMemory = CarImagesRepositoryInMemory;