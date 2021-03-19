import { Category } from '../../model/Category'
import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
  }

  create({ name, description }: CreateCategoryDTO): Category {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })
    this.categories.push(category)
    return category
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
}
