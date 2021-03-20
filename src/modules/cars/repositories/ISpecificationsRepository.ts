import { Specification } from '../model/Specification'

export interface CreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined
  create({ name, description }: CreateSpecificationDTO): Specification
  list(): Specification[]
}
