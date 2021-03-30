import { CreateCarDTO } from "../dtos/CreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>
  create(data: CreateCarDTO): Promise<Car>
  list(): Promise<Car[]>
}
