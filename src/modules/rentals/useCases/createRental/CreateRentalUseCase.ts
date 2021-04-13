import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentalDTO): Promise<Rental> {
    const minimumRentalHours = 24
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable!', 400)
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )
    if (rentalOpenToUser) {
      throw new AppError('Already have a rental in progress', 400)
    }

    const compareDate = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    )

    if (compareDate < minimumRentalHours) {
      throw new AppError('Invalid return time', 400)
    }

    const newRental = this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.carsRepository.updateCarAvailability(car_id, false)

    return newRental
  }
}
