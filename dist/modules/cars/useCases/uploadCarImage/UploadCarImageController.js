"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImageController {
  async handle(request, response) {
    try {
      const {
        id
      } = request.params;
      const images = request.files;

      const uploadCarImage = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImageUseCase);

      const images_name = images.map(file => file.filename);
      await uploadCarImage.execute({
        car_id: id,
        images_name
      });
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.UploadCarImageController = UploadCarImageController;