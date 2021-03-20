import { Category } from "../../model/Category"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute({ name, description }: IRequest): Category | undefined {
    const categoryExists = this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists!')
    }

    const newCategory = this.categoriesRepository.create({
      name,
      description,
    })

    return newCategory
  }
}
