"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appRoutes = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rentals = require("./rentals.route");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

const appRoutes = (0, _express.Router)();
exports.appRoutes = appRoutes;
appRoutes.use('/categories', _categories.categoriesRoutes);
appRoutes.use('/specifications', _specifications.specificationsRoutes);
appRoutes.use('/users', _users.usersRoutes);
appRoutes.use('/cars', _cars.carsRoutes);
appRoutes.use('/rentals', _rentals.rentalsRoutes);
appRoutes.use('/password', _password.passwordRoutes);
appRoutes.use(_authenticate.authenticateRoutes);