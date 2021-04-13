"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = void 0;

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureAdmin = async (request, _response, next) => {
  const {
    id
  } = request.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const {
    isAdmin
  } = await usersRepository.findById(id);

  if (!isAdmin) {
    throw new _AppError.default('User is not admin!', 401);
  }

  next();
};

exports.ensureAdmin = ensureAdmin;