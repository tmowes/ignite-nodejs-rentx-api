import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { userTableName } from "@modules/accounts/infra/typeorm/entities/User";

import { idColumn, timestampColumns } from "./utils";

export class CreateUsers1616964221540 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: userTableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'driver_license',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(userTableName)
  }
}
