import { Router } from 'express'
import multer from 'multer'

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listAllCategoriesController } from '../modules/cars/useCases/listAllCategories'

export const categoriesRoutes = Router()

const uploadConfig = multer({
  dest: './tmp'

})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return listAllCategoriesController.handle(request, response)
})


categoriesRoutes.post('/import', uploadConfig.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})
