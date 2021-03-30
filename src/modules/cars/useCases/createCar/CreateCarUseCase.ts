import { inject, injectable } from 'tsyringe'

import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository) { }

  async execute(data: CreateCarDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(data.license_plate)

    if (carExists) {
      throw new AppError('Car already exists!', 400)
    }
    const newCar = this.carsRepository.create({ ...data })
    return newCar
  }
}
