import { Router } from 'express'

import { CategoriesRepository } from '../repositories/implementations/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

export const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  const newCategory = createCategoryService.execute({ name, description })

  return response.status(201).json(newCategory)
})

categoriesRoutes.get('/', (_, response) => {
  const allCategories = categoriesRepository.list()
  return response.status(201).json(allCategories)
})
