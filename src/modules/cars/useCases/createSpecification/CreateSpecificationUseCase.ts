import { Specification } from "../../model/Specification"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest): Specification | undefined {
    const specificationExists = this.specificationsRepository.findByName(name)

    if (specificationExists) {
      throw new Error('Specification already exists!')
    }

    const newSpecification = this.specificationsRepository.create({
      name,
      description,
    })

    return newSpecification
  }
}
