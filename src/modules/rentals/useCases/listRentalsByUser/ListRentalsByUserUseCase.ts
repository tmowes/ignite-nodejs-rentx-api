import { inject, injectable } from 'tsyringe'

import { ListRentalsByUserDTO } from '@modules/rentals/dtos/ListRentalsByUserDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository) { }

  async execute({ user_id }: ListRentalsByUserDTO): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findRentalByUser(user_id)

    if (!rentalByUser) {
      throw new AppError('Rental with this user not found!', 404)
    }

    return rentalByUser
  }
}
