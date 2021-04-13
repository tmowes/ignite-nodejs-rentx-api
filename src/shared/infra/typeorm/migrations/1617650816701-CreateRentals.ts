import { userTableName } from '@modules/accounts/infra/typeorm/entities/User'
import { carsTableName } from '@modules/cars/infra/typeorm/entities/Car'
import { rentalsTableName } from '@modules/rentals/infra/typeorm/entities/Rental'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateRentals1617650816701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: rentalsTableName,
        columns: [
          idColumn,
          {
            name: 'car_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'total',
            type: 'numeric',
            isNullable: true,
          },
          ...timestampColumns,
        ],

        foreignKeys: [
          {
            name: 'FKCarRental',
            referencedTableName: carsTableName,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUserRental',
            referencedTableName: userTableName,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(rentalsTableName)
  }
}
