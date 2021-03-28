import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { specificationTableName } from "../../modules/cars/entities/Specification";
import { idColumn, timestampColumns } from "./utils";

export class CreateSpecification1616935988226 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: specificationTableName,
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
    await queryRunner.dropTable(specificationTableName)
  }

}
