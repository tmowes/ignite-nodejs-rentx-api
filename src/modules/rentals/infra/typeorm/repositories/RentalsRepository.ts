import { CreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { getRepository, Repository } from 'typeorm'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>
  constructor() {
    this.repository = getRepository(Rental)
  }

  async create(data: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalOpenByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })
    return rentalOpenByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalOpenByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })
    return rentalOpenByUser
  }

  async findRentalByUser(user_id: string): Promise<Rental[]> {
    const rentalsOpenByUser = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    })
    return rentalsOpenByUser
  }

  async findById(id: string): Promise<Rental> {
    const rentalById = await this.repository.findOne(id)
    return rentalById
  }
}
