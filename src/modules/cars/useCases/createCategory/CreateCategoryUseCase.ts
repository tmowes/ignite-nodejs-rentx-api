import { inject, injectable } from 'tsyringe'

import { Category } from "../../entities/Category"
import { CreateCategoryDTO, ICategoriesRepository } from "../../repositories/ICategoriesRepository"

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: CreateCategoryDTO): Promise<Category | undefined> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists!')
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      description,
    })

    return newCategory
  }
}
