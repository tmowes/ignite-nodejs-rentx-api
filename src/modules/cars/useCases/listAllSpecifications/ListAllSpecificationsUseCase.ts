import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

export class ListAllSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute(): Specification[] {
    return this.specificationsRepository.list()
  }
}
