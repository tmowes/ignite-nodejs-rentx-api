import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO"
import { Car } from "@modules/cars/infra/typeorm/entities/Car"

import { ICarsRepository } from "../ICarsRepository"

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[]
  constructor() {
    this.cars = []
  }

  async create(data: CreateCategoryDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, data)
    this.cars.push(car)
    return car
  }

  async list(): Promise<Car[]> {
    const allCars = this.cars
    return allCars
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate)
    return car
  }
}
