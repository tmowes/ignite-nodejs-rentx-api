import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { User } from "../../entities/User"
import { IUsersRepository } from "../../repositories/IUsersRepository"


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new AppError('User already exists!', 403)
    }

    const passwordHashed = await hash(data.password, 8)

    const newUser = this.usersRepository.create({ ...data, password: passwordHashed })

    return newUser
  }
}
