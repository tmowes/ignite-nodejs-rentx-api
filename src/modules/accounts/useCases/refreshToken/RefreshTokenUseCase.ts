import auth from '@config/auth'
import {
  IPayload,
  IResponseDTO,
  RefreshTokenDTO,
} from '@modules/accounts/dtos/RefreshTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ token }: RefreshTokenDTO): Promise<IResponseDTO> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_refresh_token,
    } = auth

    const { email, sub: user_id } = verify(
      token,
      secret_refresh_token
    ) as IPayload

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) {
      throw new AppError('Refresh token does not exists', 400)
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    const new_token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    })

    const response = {
      token: new_token,
      refresh_token,
    }

    return response
  }
}
