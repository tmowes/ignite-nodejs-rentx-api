import { getRepository, Repository } from 'typeorm';

import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: CreateCarDTO): Promise<Car> {
    const car = this.repository.create(data)
    await this.repository.save(car)
    return car
  }

  async list(): Promise<Car[]> {
    const allCars = await this.repository.find()
    return allCars
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } })
    return car
  }
}
