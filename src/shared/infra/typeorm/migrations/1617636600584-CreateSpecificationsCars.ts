import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { carsTableName, specificationsCarsTableName } from "@modules/cars/infra/typeorm/entities/Car";
import { specificationTableName } from "@modules/cars/infra/typeorm/entities/Specification";

import { timestampColumns } from "./utils";

export class CreateSpecificationsCars1617636600584 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: specificationsCarsTableName,
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'specification_id',
            type: 'uuid',
            isNullable: true
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: "FKSpecificationCar",
            referencedTableName: specificationTableName,
            referencedColumnNames: ["id"],
            columnNames: ["specification_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKCarSpecification",
            referencedTableName: carsTableName,
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(specificationsCarsTableName)
  }

}
