import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory'

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it('should be able to authenticate an user', async () => {
    const createdUser: CreateUserDTO = {
      name: 'User Name Test',
      email: 'useremail@test.com',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      password: 'correct_password',
      avatar: null,
    }

    await createUserUseCase.execute(createdUser)

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: createdUser.password,
    })
    expect(authenticatedUser).toHaveProperty('token')
  })
  it('should not be able to authenticate a non existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonuseremail@test.com',
        password: 'correct_password',
      })
    ).rejects.toEqual(new AppError('Credentials incorrect!', 400))
  })
  it('should not be able to authenticate a user with incorrect password', async () => {
    const createdUser: CreateUserDTO = {
      name: 'User Name Test',
      email: 'useremail@test.com',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      password: 'correct_password',
      avatar: null,
    }
    await createUserUseCase.execute(createdUser)
    await expect(
      authenticateUserUseCase.execute({
        email: createdUser.email,
        password: 'incorrect_password',
      })
    ).rejects.toEqual(new AppError('Credentials incorrect!', 400))
  })
})
