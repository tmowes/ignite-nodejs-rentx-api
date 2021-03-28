import { Category } from '../entities/Category'

export interface CreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>
  create({ name, description }: CreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
}
