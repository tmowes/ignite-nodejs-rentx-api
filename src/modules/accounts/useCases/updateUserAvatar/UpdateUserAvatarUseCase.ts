import { inject, injectable } from 'tsyringe'

import { UpdateUserAvatarDTO } from '@modules/accounts/dtos/UpdateUserAvatarDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { deleteFile } from '@utils/file'

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  async execute({ user_id, avatar_file }: UpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    if (!user) {
      throw new AppError('User not exists!', 404)
    }

    const updateUser = this.usersRepository.create({ ...user, avatar: avatar_file })

    return updateUser
  }
}
