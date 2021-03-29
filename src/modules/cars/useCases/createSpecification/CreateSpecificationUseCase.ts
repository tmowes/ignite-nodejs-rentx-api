import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { CreateSpecificationDTO } from '../../dtos/CreateSpecificationDTO'
import { Specification } from "../../entities/Specification"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: CreateSpecificationDTO): Promise<Specification | undefined> {
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
