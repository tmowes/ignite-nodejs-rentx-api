import { CreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  create({ name, description }: CreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
}
