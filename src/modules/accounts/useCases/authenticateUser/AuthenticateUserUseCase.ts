import auth from '@config/auth'
import {
  AuthenticateUserDTO,
  AuthenticateUserResponseDTO,
} from '@modules/accounts/dtos/AuthenticateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<AuthenticateUserResponseDTO> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_refresh_token,
    } = auth

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    })

    const tokenResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenResponse
  }
}
