"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _CreateCategoryController = require("@modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("@modules/cars/useCases/importCategory/ImportCategoryController");

var _ListAllCategoriesController = require("@modules/cars/useCases/listAllCategories/ListAllCategoriesController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const listAllCategoriesController = new _ListAllCategoriesController.ListAllCategoriesController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const uploadConfig = (0, _multer.default)({
  dest: './tmp'
});
categoriesRoutes.post('/', _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listAllCategoriesController.handle);
categoriesRoutes.post('/import', uploadConfig.single('file'), _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, importCategoryController.handle);