"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1617646689360 = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

var _CarImage = require("@modules/cars/infra/typeorm/entities/CarImage");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateCarImages1617646689360 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _CarImage.carImagesTableName,
      columns: [_utils.idColumn, {
        name: 'image_name',
        type: 'varchar'
      }, {
        name: 'car_id',
        type: 'uuid',
        isNullable: true
      }, ..._utils.timestampColumns],
      foreignKeys: [{
        name: 'FKCarImages',
        referencedTableName: _Car.carsTableName,
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_CarImage.carImagesTableName);
  }

}

exports.CreateCarImages1617646689360 = CreateCarImages1617646689360;