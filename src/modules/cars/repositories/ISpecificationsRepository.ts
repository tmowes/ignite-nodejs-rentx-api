import { CreateSpecificationDTO } from '../dtos/CreateSpecificationDTO';
import { Specification } from '../entities/Specification'

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>
  create({ name, description }: CreateSpecificationDTO): Promise<Specification>
  list(): Promise<Specification[]>
}
