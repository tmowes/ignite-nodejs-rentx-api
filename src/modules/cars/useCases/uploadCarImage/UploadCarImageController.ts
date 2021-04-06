import { Response, Request } from "express"
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from "./UploadCarImageUseCase"

interface IFiles {
  filename: string
}

export class UploadCarImageController {

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const images = request.files as IFiles[]

      const uploadCarImage = container.resolve(UploadCarImageUseCase)

      const images_name = images.map(file => file.filename)

      await uploadCarImage.execute({ car_id: id, images_name })

      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
