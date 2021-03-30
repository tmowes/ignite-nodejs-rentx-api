import { getRepository, Repository } from 'typeorm';

import { CreateSpecificationDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { Specification } from '../entities/Specification';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>
  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    })
    await this.repository.save(specification)
    return specification
  }

  async list(): Promise<Specification[]> {
    const allSpecifications = await this.repository.find()
    return allSpecifications
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ where: { name } })
    return specification
  }
}