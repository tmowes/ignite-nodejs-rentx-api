"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

var _express = require("express");

var _middlewares = require("../middlewares");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalsRoutes.post('/', _middlewares.ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post('/devolution/:id', _middlewares.ensureAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get('/user', _middlewares.ensureAuthenticated, listRentalsByUserController.handle);