import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { DevolutionRentalDTO } from '@modules/rentals/dtos/DevolutionRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider) { }

  async execute({ id, user_id }: DevolutionRentalDTO): Promise<Rental> {
    const minimumRentalDays = 1

    const rental = await this.rentalsRepository.findById(id)

    if (!rental) {
      throw new AppError('Rental not found!', 404)
    }
    const rentalByUser = await this.rentalsRepository.findRentalByUser(user_id)

    if (!rentalByUser) {
      throw new AppError('Rental for this user was not found!', 404)
    }

    const carInRental = await this.carsRepository.findById(rental.car_id)

    if (!carInRental) {
      throw new AppError('Car in rental not found!', 404)
    }

    const carDailyAmount = carInRental.daily_rate

    const carFineAmount = carInRental.fine_amount

    const rentalDelayInDays = this.dateProvider.compareInDays(rental.expected_return_date, this.dateProvider.dateNow())

    let rentalDailyInDays = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())

    console.log({ rentalDelayInDays, rentalDailyInDays })

    if (rentalDailyInDays <= 0) rentalDailyInDays = minimumRentalDays

    let total = 0

    if (rentalDelayInDays > 0) {
      const calculateFineAmount = rentalDelayInDays * carFineAmount
      console.log({ calculateFineAmount })
      total = calculateFineAmount
    }

    total += rentalDailyInDays * carDailyAmount

    console.log({ total, rentalDailyInDays, carDailyAmount })

    Object.assign(rental, {
      end_date: this.dateProvider.dateNow(),
      total,
    })

    console.log({ rental })

    const rentalEnd = await this.rentalsRepository.create(rental)
    await this.carsRepository.updateCarAvailability(rental.car_id, true)

    return rentalEnd
  }
}
