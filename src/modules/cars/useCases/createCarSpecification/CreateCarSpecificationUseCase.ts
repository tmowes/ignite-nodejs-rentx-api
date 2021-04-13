import { CreateCarSpecificationDTO } from '@modules/cars/dtos/CreateCarSpecificationDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: CreateCarSpecificationDTO): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car not found', 400)
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    Object.assign(carExists, { specifications })

    await this.carsRepository.create(carExists)

    return carExists
  }
}
