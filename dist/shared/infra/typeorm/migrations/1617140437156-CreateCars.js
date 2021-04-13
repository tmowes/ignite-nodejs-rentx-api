"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCars1617140437156 = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateCars1617140437156 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _Car.carsTableName,
      columns: [_utils.idColumn, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'daily_rate',
        type: 'numeric'
      }, {
        name: 'available',
        type: 'boolean',
        default: true
      }, {
        name: 'license_plate',
        type: 'varchar'
      }, {
        name: 'fine_amount',
        type: 'numeric'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'category_id',
        type: 'uuid',
        isNullable: true
      }, ..._utils.timestampColumns],
      foreignKeys: [{
        name: 'FKCategoryCar',
        referencedTableName: _Category.categoryTableName,
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_Car.carsTableName);
  }

}

exports.CreateCars1617140437156 = CreateCars1617140437156;