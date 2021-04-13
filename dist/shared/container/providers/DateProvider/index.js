"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton('DateProvider', _DayjsDateProvider.DayjsDateProvider);