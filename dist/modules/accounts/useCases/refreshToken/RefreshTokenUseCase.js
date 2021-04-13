"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _auth = _interopRequireDefault(require("@config/auth"));

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    token
  }) {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_refresh_token
    } = _auth.default;
    const {
      email,
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, secret_refresh_token);
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new _AppError.default('Refresh token does not exists', 400);
    }

    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    });
    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    const new_token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token
    });
    const response = {
      token: new_token,
      refresh_token
    };
    return response;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;