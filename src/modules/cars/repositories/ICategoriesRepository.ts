import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';
import { Category } from '../entities/Category'



export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>
  create({ name, description }: CreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
}
