import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { deleteFile } from '../../../../utils/file'
import { UpdateUserAvatarDTO } from '../../dtos/UpdateUserAvatarDTO'
import { User } from "../../entities/User"
import { IUsersRepository } from "../../repositories/IUsersRepository"

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
