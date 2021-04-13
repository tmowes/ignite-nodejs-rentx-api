import { UpdateUserAvatarDTO } from '@modules/accounts/dtos/UpdateUserAvatarDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: UpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not exists!', 404)
    }

    if (user.avatar) {
      await this.storageProvider.delete(avatar_file, 'avatar')
    }

    await this.storageProvider.save(avatar_file, 'avatar')

    const updateUser = this.usersRepository.create({
      ...user,
      avatar: avatar_file,
    })

    return updateUser
  }
}
