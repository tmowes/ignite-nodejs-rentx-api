import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { ListAvailableCarsDTO } from '@modules/cars/dtos/ListAvailableCarsDTO';
import { Car } from "@modules/cars/infra/typeorm/entities/Car"

import { ICarsRepository } from "../ICarsRepository"

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[]
  constructor() {
    this.cars = []
  }

  async create(data: CreateCarDTO): Promise<Car> {
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

  async findAvailable({ brand, category_id, name }: ListAvailableCarsDTO): Promise<Car[]> {
    const allCars = this.cars.filter(car => {
      if (car.available === true || (
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
      )) {
        return car
      }
      return null
    })
    return allCars
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id)
    return car
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    const car = this.cars.find(car => car.id === id)
    Object.assign(car, { available })
  }
}
