"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = void 0;

var _auth = _interopRequireDefault(require("@config/auth"));

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureAuthenticated = async (request, _response, next) => {
  const {
    authorization
  } = request.headers;

  if (!authorization) {
    throw new _AppError.default('Token missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch (err) {
    throw new _AppError.default('Invalid token', 401);
  }
};

exports.ensureAuthenticated = ensureAuthenticated;