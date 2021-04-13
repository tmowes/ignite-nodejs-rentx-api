"use strict";

var _CarsRepositoryInMemory = require("../../../cars/repositories/inMemory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repositories/inMemory/RentalsRepositoryInMemory");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe('Create Rental', () => {
  const dateNow = (0, _dayjs.default)().toDate();
  const dateNowPlus24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
  });
  it('should be able to create a new rental', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car Name Test',
      description: 'Car Description Test',
      daily_rate: 100,
      license_plate: 'Car License Plate Test',
      fine_amount: 10,
      brand: 'Car Brand Test',
      category_id: 'Car category_id Test'
    });
    const createdRental = {
      user_id: 'Rental user_id Test',
      car_id: createdCar.id,
      expected_return_date: dateNowPlus24Hours
    };
    const rentalCreated = await createRentalUseCase.execute(createdRental);
    expect(rentalCreated).toHaveProperty('id');
    expect(rentalCreated).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if is already open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours
    });
    const createdRental2 = {
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id2 Test',
      expected_return_date: dateNowPlus24Hours
    };
    await expect(createRentalUseCase.execute(createdRental2)).rejects.toEqual(new _AppError.default('Already have a rental in progress', 400));
  });
  it('should not be able to create a new rental with a unavailable car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours
    });
    const createdRental2 = {
      user_id: 'Rental user_id2 Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNowPlus24Hours
    };
    await expect(createRentalUseCase.execute(createdRental2)).rejects.toEqual(new _AppError.default('Car is unavailable!', 400));
  });
  it('should not be able to create a new rental with a return date below 24hours', async () => {
    const createdRental = {
      user_id: 'Rental user_id Test',
      car_id: 'Rental car_id Test',
      expected_return_date: dateNow
    };
    await expect(createRentalUseCase.execute(createdRental)).rejects.toEqual(new _AppError.default('Invalid return time', 400));
  });
});