"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersToken1618245328456 = void 0;

var _User = require("@modules/accounts/infra/typeorm/entities/User");

var _UserTokens = require("@modules/accounts/infra/typeorm/entities/UserTokens");

var _typeorm = require("typeorm");

var _utils = require("./utils");

class CreateUsersToken1618245328456 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: _UserTokens.userTokensTableName,
      columns: [_utils.idColumn, {
        name: 'refresh_token',
        type: 'varchar'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'expires_date',
        type: 'timestamp'
      }, ..._utils.timestampColumns],
      foreignKeys: [{
        name: 'FKUserToken',
        referencedTableName: _User.userTableName,
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(_UserTokens.userTokensTableName);
  }

}

exports.CreateUsersToken1618245328456 = CreateUsersToken1618245328456;