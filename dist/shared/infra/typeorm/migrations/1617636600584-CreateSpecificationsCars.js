"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1617636600584 = void 0;

var _Car = require("../../../../modules/cars/infra/typeorm/entities/Car");

var _Specification = require("../../../../modules/cars/infra/typeorm/entities/Specification");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateSpecificationsCars1617636600584 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _Car.specificationsCarsTableName,
      columns: [{
        name: 'car_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'specification_id',
        type: 'uuid',
        isNullable: true
      }, ..._utils.timestampColumns],
      foreignKeys: [{
        name: 'FKSpecificationCar',
        referencedTableName: _Specification.specificationTableName,
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FKCarSpecification',
        referencedTableName: _Car.carsTableName,
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_Car.specificationsCarsTableName);
  }

}

exports.CreateSpecificationsCars1617636600584 = CreateSpecificationsCars1617636600584;