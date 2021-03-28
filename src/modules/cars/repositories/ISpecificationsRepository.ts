import { Specification } from '../entities/Specification'

export interface CreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>
  create({ name, description }: CreateSpecificationDTO): Promise<Specification>
  list(): Promise<Specification[]>
}
