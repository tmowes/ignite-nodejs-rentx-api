import { CreateUserDTO } from "@modules/accounts/dtos/CreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory"
import AppError from "@shared/errors/AppError"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it('should be able to authenticate an user', async () => {
    const createdUser: CreateUserDTO = {
      name: "User Name Test",
      email: "useremail@test.com",
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      password: 'correct_password',
      avatar: null
    }

    await createUserUseCase.execute(createdUser)

    const authenticatedUser = await authenticateUserUseCase.execute({ email: createdUser.email, password: createdUser.password })
    expect(authenticatedUser).toHaveProperty('token')
  })
  it('should not be able to authenticate a non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: "nonuseremail@test.com", password: 'correct_password' })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to authenticate a user with incorrect password', async () => {
    expect(async () => {
      const createdUser: CreateUserDTO = {
        name: "User Name Test",
        email: "useremail@test.com",
        driver_license: 'USER_DRIVER_LICENSE_TEST',
        password: 'correct_password',
        avatar: null
      }

      await createUserUseCase.execute(createdUser)

      await authenticateUserUseCase.execute({ email: createdUser.email, password: 'incorrect_password' })
    }).rejects.toBeInstanceOf(AppError)
  })
})
