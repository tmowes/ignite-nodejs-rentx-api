import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })
  it('should not be able to add a new car specification to a non-existent car', async () => {
    const car_id = '123'
    const specifications_id = ['123', '456', '789']
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError('Car not found', 400))
  })

  it('should be able to add a new car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 99,
      license_plate: 'USA-1234',
      fine_amount: 99,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test',
    })

    const createdSpecification = await specificationsRepositoryInMemory.create({
      name: 'Specification Name Test',
      description: 'Specification Description Test',
    })

    const specifications_id = [createdSpecification.id]

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCar).toHaveProperty('specifications')
    expect(specificationsCar.specifications.length).toBe(1)
  })
})
