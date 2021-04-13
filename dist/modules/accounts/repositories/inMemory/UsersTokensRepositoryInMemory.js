"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.userTokens = void 0;
    this.userTokens = [];
  }

  async create(data) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, { ...data
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.userTokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userToken = this.userTokens.find(userToken => userToken.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.userTokens.find(token => token.refresh_token === refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;