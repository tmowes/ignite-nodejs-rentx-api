import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  file: Express.Multer.File
}

interface IImportCategory {
  name: string
  description: string
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }

  loadCategories({ file }: IRequest): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({ name, description })
      }).on('end', () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      }).on('error', (err) => {
        reject(err)
      })
    })
  }

  async execute({ file }: IRequest): Promise<Category[] | []> {
    const categories = await this.loadCategories({ file })
    const newCategories: Category[] = []
    categories.map(async ({ name, description }) => {
      const categoryExists = await this.categoriesRepository.findByName(name)

      if (!categoryExists) {
        const newCategory = await this.categoriesRepository.create({
          name,
          description,
        })
        newCategories.push(newCategory)
      }
    })
    return newCategories
  }
}
