"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async create(data) {
    const specification = this.repository.create(data);
    await this.repository.save(specification);
    return specification;
  }

  async list() {
    const allSpecifications = await this.repository.find();
    return allSpecifications;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({
      where: {
        name
      }
    });
    return specification;
  }

  async findByIds(ids) {
    const specificationsIds = await this.repository.findByIds(ids);
    return specificationsIds;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;