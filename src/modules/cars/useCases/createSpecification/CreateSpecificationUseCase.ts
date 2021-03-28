import { inject, injectable } from 'tsyringe'

import { Specification } from "../../entities/Specification"
import { CreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: CreateSpecificationDTO): Promise<Specification | undefined> {
    const specificationExists = await this.specificationsRepository.findByName(name)

    if (specificationExists) {
      throw new Error('Specification already exists!')
    }

    const newSpecification = await this.specificationsRepository.create({
      name,
      description,
    })

    return newSpecification
  }
}
