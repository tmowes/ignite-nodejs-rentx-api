import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListAllCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const allCategories = await this.categoriesRepository.list()
    return allCategories
  }
}
