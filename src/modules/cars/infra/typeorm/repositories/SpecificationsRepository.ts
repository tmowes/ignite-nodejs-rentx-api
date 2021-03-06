import { CreateSpecificationDTO } from '@modules/cars/dtos/CreateSpecificationDTO'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { getRepository, Repository } from 'typeorm'

import { Specification } from '../entities/Specification'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>
  constructor() {
    this.repository = getRepository(Specification)
  }

  async create(data: CreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(data)
    await this.repository.save(specification)
    return specification
  }

  async list(): Promise<Specification[]> {
    const allSpecifications = await this.repository.find()
    return allSpecifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } })
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specificationsIds = await this.repository.findByIds(ids)
    return specificationsIds
  }
}
