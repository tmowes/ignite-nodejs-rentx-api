import { CreateCarImageDTO } from '../dtos/CreateCarImageDTO'
import { CarImage } from '../infra/typeorm/entities/CarImage'

export interface ICarImagesRepository {
  create(data: CreateCarImageDTO): Promise<CarImage>
}
