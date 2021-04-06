import { inject, injectable } from 'tsyringe'

import { UploadCarImageDTO } from '@modules/cars/dtos/UploadCarImageDTO'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository) { }

  async execute({ car_id, images_name }: UploadCarImageDTO): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carImagesRepository.create({ car_id, image_name })
    })
  }
}
