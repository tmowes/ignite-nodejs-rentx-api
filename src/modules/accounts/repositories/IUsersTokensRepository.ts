import { CreateUserTokenDTO } from '../dtos/CreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: CreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserTokens>
}
