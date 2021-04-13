import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[]
  constructor() {
    this.users = []
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { ...data })
    this.users.push(user)
    return user
  }

  async list(): Promise<User[]> {
    const allUsers = this.users
    return allUsers
  }

  async findByName(name: string): Promise<User> {
    const user = this.users.find((user) => user.name === name)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    return user
  }
}
