import { classToClass } from 'class-transformer'

import { ProfileUserResponseDTO } from '../dtos/ProfileUserDTO'
import { User } from '../infra/typeorm/entities/User'

export class UserMap {
  static toDTO({
    id,
    email,
    name,
    driver_license,
    avatar,
    avatar_url,
  }: User): ProfileUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    })
    return user
  }
}
