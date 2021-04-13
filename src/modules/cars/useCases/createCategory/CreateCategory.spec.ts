import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoryRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    )
  })
  it('should be able to create a new category', async () => {
    const createdCategory = {
      name: 'Category Name Test',
      description: 'Category Description Test',
    }
    await createCategoryUseCase.execute(createdCategory)
    const categoryCreated = await categoryRepositoryInMemory.findByName(
      createdCategory.name
    )
    expect(categoryCreated).toHaveProperty('id')
  })
  it('should not be able to create a new category with same name', async () => {
    const createdCategory = {
      name: 'Category Name Test',
      description: 'Category Description Test',
    }
    await createCategoryUseCase.execute(createdCategory)
    await expect(
      createCategoryUseCase.execute(createdCategory)
    ).rejects.toEqual(new AppError('Category already exists!', 400))
  })
})
