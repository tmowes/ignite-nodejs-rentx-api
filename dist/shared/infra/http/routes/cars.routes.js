"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateCarController = require("@modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _UploadCarImageController = require("@modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const upload = (0, _multer.default)(_upload.default);
carsRoutes.post('/', _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, upload.array('images'), uploadCarImageController.handle);