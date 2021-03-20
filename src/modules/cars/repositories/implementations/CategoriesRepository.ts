import { Category } from '../../model/Category'
import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]
  private static INSTANCE: CategoriesRepository;
  constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: CreateCategoryDTO): Category {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
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
