import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO"
import { Category } from "@modules/cars/infra/typeorm/entities/Category"

import { ICategoriesRepository } from "../ICategoriesRepository"

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
  }

  async create({ name, description }: CreateCategoryDTO): Promise<Category> {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
    })
    this.categories.push(category)
    return category
  }

  async list(): Promise<Category[]> {
    const allCategories = this.categories
    return allCategories
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
}
