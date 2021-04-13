"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _CreateSpecificationController = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ListAllSpecificationsController = require("@modules/cars/useCases/listAllSpecifications/ListAllSpecificationsController");

var _express = require("express");

var _middlewares = require("../middlewares");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listAllSpecificationsController = new _ListAllSpecificationsController.ListAllSpecificationsController();
specificationsRoutes.post('/', _middlewares.ensureAuthenticated, _middlewares.ensureAdmin, createSpecificationController.handle);
specificationsRoutes.get('/', listAllSpecificationsController.handle);