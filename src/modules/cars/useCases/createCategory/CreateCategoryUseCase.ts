import { inject, injectable } from 'tsyringe'

import { CreateCategoryDTO } from '@modules/cars/dtos/CreateCategoryDTO'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import AppError from '@shared/errors/AppError'


@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: CreateCategoryDTO): Promise<Category> {
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
