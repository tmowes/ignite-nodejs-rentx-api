"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategory1616928789459 = void 0;

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateCategory1616928789459 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _Category.categoryTableName,
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
    await queryRunner.dropTable(_Category.categoryTableName);
  }

}

exports.CreateCategory1616928789459 = CreateCategory1616928789459;