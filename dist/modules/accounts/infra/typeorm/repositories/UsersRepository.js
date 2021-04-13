"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create(data) {
    const user = this.repository.create({ ...data
    });
    await this.repository.save(user);
    return user;
  }

  async list() {
    const allUsers = await this.repository.find();
    return allUsers;
  }

  async findByName(name) {
    const user = await this.repository.findOne({
      name
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }

}

exports.UsersRepository = UsersRepository;