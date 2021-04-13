"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/inMemory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const createdUser = {
      name: 'User Name Test',
      email: 'useremail@test.com',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      password: 'correct_password',
      avatar: null
    };
    await createUserUseCase.execute(createdUser);
    const authenticatedUser = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: createdUser.password
    });
    expect(authenticatedUser).toHaveProperty('token');
  });
  it('should not be able to authenticate a non existent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'nonuseremail@test.com',
      password: 'correct_password'
    })).rejects.toEqual(new _AppError.default('Credentials incorrect!', 400));
  });
  it('should not be able to authenticate a user with incorrect password', async () => {
    const createdUser = {
      name: 'User Name Test',
      email: 'useremail@test.com',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      password: 'correct_password',
      avatar: null
    };
    await createUserUseCase.execute(createdUser);
    await expect(authenticateUserUseCase.execute({
      email: createdUser.email,
      password: 'incorrect_password'
    })).rejects.toEqual(new _AppError.default('Credentials incorrect!', 400));
  });
});