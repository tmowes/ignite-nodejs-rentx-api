"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1616964221540 = void 0;

var _User = require("@modules/accounts/infra/typeorm/entities/User");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateUsers1616964221540 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _User.userTableName,
      columns: [_utils.idColumn, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'driver_license',
        type: 'varchar'
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'isAdmin',
        type: 'boolean',
        default: false
      }, ..._utils.timestampColumns]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_User.userTableName);
  }

}

exports.CreateUsers1616964221540 = CreateUsers1616964221540;