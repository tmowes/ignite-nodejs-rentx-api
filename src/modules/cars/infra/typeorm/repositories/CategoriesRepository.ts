import { getRepository, Repository } from 'typeorm';

import { CreateCategoryDTO } from '@modules/cars/dtos/CreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>
  constructor() {
    this.repository = getRepository(Category)
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(data)
    await this.repository.save(category)
    return category
  }

  async list(): Promise<Category[]> {
    const allCategories = await this.repository.find()
    return allCategories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } })
    return category
  }
}
