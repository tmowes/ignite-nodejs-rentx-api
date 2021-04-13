import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it('should be able to create a new user', async () => {
    const createdNewUser = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null,
    }
    const newUserCreated = await createUserUseCase.execute(createdNewUser)
    expect(newUserCreated).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email', async () => {
    const createdNewUser: CreateUserDTO = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null,
    }

    const createDuplicatedUser: CreateUserDTO = {
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null,
    }

    await createUserUseCase.execute(createdNewUser)
    await expect(
      createUserUseCase.execute(createDuplicatedUser)
    ).rejects.toEqual(new AppError('User already exists!', 403))
  })
})
