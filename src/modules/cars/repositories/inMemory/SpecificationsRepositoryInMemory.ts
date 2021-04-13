import { CreateSpecificationDTO } from '@modules/cars/dtos/CreateSpecificationDTO'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository {
  private specifications: Specification[]
  constructor() {
    this.specifications = []
  }

  async create(data: CreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, data)
    this.specifications.push(specification)
    return specification
  }

  async list(): Promise<Specification[]> {
    const allSpecifications = this.specifications
    return allSpecifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )
    return allSpecifications
  }
}
