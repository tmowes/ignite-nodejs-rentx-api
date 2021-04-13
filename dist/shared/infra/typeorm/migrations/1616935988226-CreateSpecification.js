"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecification1616935988226 = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateSpecification1616935988226 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _Specification.specificationTableName,
      columns: [_utils.idColumn, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, ..._utils.timestampColumns]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_Specification.specificationTableName);
  }

}

exports.CreateSpecification1616935988226 = CreateSpecification1616935988226;