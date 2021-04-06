import { CreateCarDTO } from "../dtos/CreateCarDTO";
import { ListAvailableCarsDTO } from "../dtos/ListAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>
  create(data: CreateCarDTO): Promise<Car>
  list(): Promise<Car[]>
  findAvailable(data?: ListAvailableCarsDTO): Promise<Car[]>
  findById(id: string): Promise<Car>
  updateCarAvailability(id: string, available: boolean): Promise<void>
}
