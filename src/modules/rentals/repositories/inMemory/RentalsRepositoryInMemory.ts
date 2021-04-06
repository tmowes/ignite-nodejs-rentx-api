import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[]
  constructor() {
    this.rentals = []
  }

  async create(data: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      ...data,
      start_date: new Date(),
    })

    this.rentals.push(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
    return rentalByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUser = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
    return rentalByUser
  }

  async findRentalByUser(user_id: string): Promise<Rental[]> {
    const rentalsByUser = this.rentals.filter(rental => rental.user_id === user_id)
    return rentalsByUser
  }

  async findById(id: string): Promise<Rental> {
    const rentalByUser = this.rentals.find(rental => rental.id === id && !rental.end_date)
    return rentalByUser
  }
}
