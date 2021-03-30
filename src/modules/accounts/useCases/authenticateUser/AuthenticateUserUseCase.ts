import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AuthenticateUserDTO, AuthenticateUserResponseDTO } from '@modules/accounts/dtos/AuthenticateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'


@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  async execute(data: AuthenticateUserDTO): Promise<AuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Email or password incorrect', 403)
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 403)
    }

    const token = sign({}, '13df1a8dc2d003d4583f327fe1ad48c4', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      token,
      user: {
        name: user.name,
        email: user.email
      },
    }
  }
}
