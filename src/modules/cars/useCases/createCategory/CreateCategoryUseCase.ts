import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { CreateCategoryDTO } from '../../dtos/CreateCategoryDTO'
import { Category } from "../../entities/Category"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: CreateCategoryDTO): Promise<Category | undefined> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new AppError('Category already exists!', 400)
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      description,
    })

    return newCategory
  }
}
