import {
  ProfileUserDTO,
  ProfileUserResponseDTO,
} from '@modules/accounts/dtos/ProfileUserDTO'
import { UserMap } from '@modules/accounts/mapper/UserMap'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: ProfileUserDTO): Promise<ProfileUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exists!', 400)
    }

    return UserMap.toDTO(user)
  }
}
