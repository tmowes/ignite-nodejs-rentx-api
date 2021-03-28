import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListAllCategoriesController } from '../modules/cars/useCases/listAllCategories/ListAllCategoriesController'

export const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()
const listAllCategoriesController = new ListAllCategoriesController()
const importCategoryController = new ImportCategoryController()

const uploadConfig = multer({
  dest: './tmp'
})

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listAllCategoriesController.handle)

categoriesRoutes.post('/import', uploadConfig.single('file'), importCategoryController.handle)
