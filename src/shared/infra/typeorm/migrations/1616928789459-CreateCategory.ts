import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { categoryTableName } from "@modules/cars/infra/typeorm/entities/Category";

import { idColumn, timestampColumns } from "./utils";

export class CreateCategory1616928789459 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: categoryTableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(categoryTableName)
  }

}
