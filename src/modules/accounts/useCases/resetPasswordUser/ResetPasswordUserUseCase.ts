import { ResetPasswordUserDTO } from '@modules/accounts/dtos/ResetPasswordUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: ResetPasswordUserDTO): Promise<User> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    const isTokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )

    if (isTokenExpired) {
      throw new AppError('Token expired')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    const updateUser = await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)

    return updateUser
  }
}
