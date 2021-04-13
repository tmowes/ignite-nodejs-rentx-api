import { carsTableName } from '@modules/cars/infra/typeorm/entities/Car'
import { carImagesTableName } from '@modules/cars/infra/typeorm/entities/CarImage'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateCarImages1617646689360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: carImagesTableName,
        columns: [
          idColumn,
          {
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'car_id',
            type: 'uuid',
            isNullable: true,
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'FKCarImages',
            referencedTableName: carsTableName,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(carImagesTableName)
  }
}
