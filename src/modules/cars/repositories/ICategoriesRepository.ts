import { CreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  create(data: CreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
}
