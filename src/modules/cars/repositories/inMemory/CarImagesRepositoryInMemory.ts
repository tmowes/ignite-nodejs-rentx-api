import { CreateCarImageDTO } from '@modules/cars/dtos/CreateCarImageDTO';

import { CarImage } from "../../infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "../ICarImagesRepository"


export class CarImagesRepositoryInMemory implements ICarImagesRepository {
  private carImages: CarImage[]
  constructor() {
    this.carImages = []
  }

  async create(data: CreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage()
    Object.assign(carImage, data)
    this.carImages.push(carImage)
    return carImage
  }
}
