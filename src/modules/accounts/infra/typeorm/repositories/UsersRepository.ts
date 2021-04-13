import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'

import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>
  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create({ ...data })
    await this.repository.save(user)
    return user
  }

  async list(): Promise<User[]> {
    const allUsers = await this.repository.find()
    return allUsers
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name })
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }
}
