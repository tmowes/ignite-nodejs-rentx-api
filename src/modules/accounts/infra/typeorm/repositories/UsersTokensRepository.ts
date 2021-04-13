import { CreateUserTokenDTO } from '@modules/accounts/dtos/CreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { getRepository, Repository } from 'typeorm'

import { UserTokens } from '../entities/UserTokens'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>
  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create(data: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({ ...data })
    await this.repository.save(userToken)
    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token,
    })
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token })
    return userToken
  }
}
