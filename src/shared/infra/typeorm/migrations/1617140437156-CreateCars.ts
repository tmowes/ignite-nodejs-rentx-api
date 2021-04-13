import { carsTableName } from '@modules/cars/infra/typeorm/entities/Car'
import { categoryTableName } from '@modules/cars/infra/typeorm/entities/Category'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateCars1617140437156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: carsTableName,
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
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'FKCategoryCar',
            referencedTableName: categoryTableName,
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(carsTableName)
  }
}
