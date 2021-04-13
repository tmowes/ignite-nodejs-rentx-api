"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (host = 'database_ignite') => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
    database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
  }));
};

exports.default = _default;