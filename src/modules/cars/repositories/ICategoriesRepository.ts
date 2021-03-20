import { Category } from '../model/Category'

export interface CreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  findByName(name: string): Category | undefined
  create({ name, description }: CreateCategoryDTO): Category
  list(): Category[]
}
