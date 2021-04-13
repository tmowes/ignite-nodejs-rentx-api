import { ListAvailableCarsDTO } from '@modules/cars/dtos/ListAvailableCarsDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: ListAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(data)
    return cars
  }
}
