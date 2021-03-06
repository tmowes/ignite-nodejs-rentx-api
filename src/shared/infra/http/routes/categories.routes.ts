import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListAllCategoriesController } from '@modules/cars/useCases/listAllCategories/ListAllCategoriesController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin, ensureAuthenticated } from '../middlewares'

export const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()
const listAllCategoriesController = new ListAllCategoriesController()
const importCategoryController = new ImportCategoryController()

const uploadConfig = multer({
  dest: './tmp',
})

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.get('/', listAllCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  uploadConfig.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)
