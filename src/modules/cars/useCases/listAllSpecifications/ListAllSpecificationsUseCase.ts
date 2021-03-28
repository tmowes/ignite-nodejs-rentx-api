import { inject, injectable } from 'tsyringe'

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListAllSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { }

  async execute(): Promise<Specification[]> {
    const allSpecifications = await this.specificationsRepository.list()
    return allSpecifications
  }
}
