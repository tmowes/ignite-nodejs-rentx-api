import { CreateRentalDTO } from '../dtos/CreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  create(data: CreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  findRentalByUser(user_id: string): Promise<Rental[]>
  findById(id: string): Promise<Rental>
}
