"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    id,
    email,
    name,
    driver_license,
    avatar,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;