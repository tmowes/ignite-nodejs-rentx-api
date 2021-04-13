import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory'
import dayjs from 'dayjs'

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dateNow = dayjs().toDate()
  const dateNowPlus24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    )
  })
  it('should be able to create a new rental', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 100,
      license_plate: 'Car License Plate Test',
      fine_amount: 10,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test',
    })

    const createdRental = {
      user_id: 'Rental user_id Test',
      car_id: createdCar.id,
      expected_return_date: dateNowPlus24Hours,
    }
    const rentalCreated = await createRentalUseCase.execute(createdRental)
    expect(rentalCreated).toHaveProperty('id')
    expect(rentalCreated).toHaveProperty('start_date')
  })
  it('should not be able to create a new rental if is already open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours,
    })
    const createdRental2 = {
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id2 Test',
      expected_return_date: dateNowPlus24Hours,
    }
    await expect(createRentalUseCase.execute(createdRental2)).rejects.toEqual(
      new AppError('Already have a rental in progress', 400)
    )
  })
  it('should not be able to create a new rental with a unavailable car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours,
    })
    const createdRental2 = {
      user_id: 'Rental user_id2 Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours,
    }
    await expect(createRentalUseCase.execute(createdRental2)).rejects.toEqual(
      new AppError('Car is unavailable!', 400)
    )
  })
  it('should not be able to create a new rental with a return date below 24hours', async () => {
    const createdRental = {
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNow,
    }
    await expect(createRentalUseCase.execute(createdRental)).rejects.toEqual(
      new AppError('Invalid return time', 400)
    )
  })
})
