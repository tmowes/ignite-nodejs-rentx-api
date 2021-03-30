import { inject, injectable } from 'tsyringe'

import { CreateSpecificationDTO } from '@modules/cars/dtos/CreateSpecificationDTO'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import AppError from '@shared/errors/AppError'


@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: CreateSpecificationDTO): Promise<Specification> {
    const specificationExists = await this.specificationsRepository.findByName(name)

    if (specificationExists) {
      throw new AppError('Specification already exists!', 400)
    }

    const newSpecification = await this.specificationsRepository.create({
      name,
      description,
    })

    return newSpecification
  }
}
