import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory"

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 99,
      license_plate: 'USA-1234',
      fine_amount: 99,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test',
    })
    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Test2',
      description: 'Car Description Test',
      daily_rate: 99,
      license_plate: 'USA-1234',
      fine_amount: 99,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test',
    })
    const cars = await listAvailableCarsUseCase.execute({ name: 'Car Name Test2', })
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Test2',
      description: 'Car Description Test',
      daily_rate: 99,
      license_plate: 'USA-1234',
      fine_amount: 99,
      brand: 'Car Brand Test2',
      category_id: 'Car category_id Test',
    })
    const cars = await listAvailableCarsUseCase.execute({ brand: 'Car Brand Test2' })
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Test2',
      description: 'Car Description Test',
      daily_rate: 99,
      license_plate: 'USA-1234',
      fine_amount: 99,
      brand: 'Car Brand Test2',
      category_id: 'Car category_id Test2',
    })
    const cars = await listAvailableCarsUseCase.execute({ category_id: 'Car category_id Test2' })
    expect(cars).toEqual([car])
  })
})
