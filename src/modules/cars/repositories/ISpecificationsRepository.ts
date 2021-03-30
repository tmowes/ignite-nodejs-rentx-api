import { CreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>
  create(data: CreateSpecificationDTO): Promise<Specification>
  list(): Promise<Specification[]>
}
