"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/inMemory/UsersRepositoryInMemory");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _CreateUserUseCase = require("./CreateUserUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createUserUseCase;
let usersRepositoryInMemory;
describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to create a new user', async () => {
    const createdNewUser = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null
    };
    const newUserCreated = await createUserUseCase.execute(createdNewUser);
    expect(newUserCreated).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email', async () => {
    const createdNewUser = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null
    };
    const createDuplicatedUser = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null
    };
    await createUserUseCase.execute(createdNewUser);
    await expect(createUserUseCase.execute(createDuplicatedUser)).rejects.toEqual(new _AppError.default('User already exists!', 403));
  });
});