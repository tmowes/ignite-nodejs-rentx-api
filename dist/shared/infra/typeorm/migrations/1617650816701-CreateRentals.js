"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentals1617650816701 = void 0;

var _User = require("../../../../modules/accounts/infra/typeorm/entities/User");

var _Car = require("../../../../modules/cars/infra/typeorm/entities/Car");

var _Rental = require("../../../../modules/rentals/infra/typeorm/entities/Rental");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateRentals1617650816701 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _Rental.rentalsTableName,
      columns: [_utils.idColumn, {
        name: 'car_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'start_date',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'end_date',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'expected_return_date',
        type: 'timestamp'
      }, {
        name: 'total',
        type: 'numeric',
        isNullable: true
      }, ..._utils.timestampColumns],
      foreignKeys: [{
        name: 'FKCarRental',
        referencedTableName: _Car.carsTableName,
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FKUserRental',
        referencedTableName: _User.userTableName,
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_Rental.rentalsTableName);
  }

}

exports.CreateRentals1617650816701 = CreateRentals1617650816701;