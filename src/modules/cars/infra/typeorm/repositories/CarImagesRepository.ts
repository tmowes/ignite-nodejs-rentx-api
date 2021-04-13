import { CreateCarImageDTO } from '@modules/cars/dtos/CreateCarImageDTO'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { getRepository, Repository } from 'typeorm'

import { CarImage } from '../entities/CarImage'

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>
  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create(data: CreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create(data)
    await this.repository.save(carImage)
    return carImage
  }
}
