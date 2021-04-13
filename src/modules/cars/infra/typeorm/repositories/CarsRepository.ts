import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO'
import { ListAvailableCarsDTO } from '@modules/cars/dtos/ListAvailableCarsDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { getRepository, Repository } from 'typeorm'

import { Car } from '../entities/Car'

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

  async findAvailable({
    brand,
    category_id,
    name,
  }: ListAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })
    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }
    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }
    const cars = await carsQuery.getMany()
    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)
    return car
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }
}
