"use strict";

var _CarsRepositoryInMemory = require("../../repositories/inMemory/CarsRepositoryInMemory");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateCarUseCase = require("./CreateCarUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createCarUseCase;
let carsRepositoryInMemory;
describe('CreateCar', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const createdCar = {
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 100,
      license_plate: 'Car License Plate Test',
      fine_amount: 10,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test'
    };
    await createCarUseCase.execute(createdCar);
    const carCreated = await carsRepositoryInMemory.findByLicensePlate(createdCar.license_plate);
    expect(carCreated).toHaveProperty('id');
  });
  it('should not be able to create a car with same license plate', async () => {
    const createdCar = {
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 100,
      license_plate: 'Car License Plate Test',
      fine_amount: 10,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test'
    };
    await createCarUseCase.execute(createdCar);
    await expect(createCarUseCase.execute(createdCar)).rejects.toEqual(new _AppError.default('Car already exists!', 400));
  });
  it('should be able to create a car with available true by default', async () => {
    const createdCar = {
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 100,
      license_plate: 'Car License Plate Test',
      fine_amount: 10,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test'
    };
    const carCreated = await createCarUseCase.execute(createdCar);
    expect(carCreated.available).toBe(true);
  });
});