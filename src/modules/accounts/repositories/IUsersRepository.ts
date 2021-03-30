import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  findByName(name: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  create(data: CreateUserDTO): Promise<User>
  list(): Promise<User[]>
}
