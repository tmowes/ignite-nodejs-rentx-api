import { userTableName } from '@modules/accounts/infra/typeorm/entities/User'
import { userTokensTableName } from '@modules/accounts/infra/typeorm/entities/UserTokens'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateUsersToken1618245328456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: userTokensTableName,
        columns: [
          idColumn,
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'expires_date',
            type: 'timestamp',
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'FKUserToken',
            referencedTableName: userTableName,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(userTokensTableName)
  }
}
