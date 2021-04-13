"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

class MailProviderInMemory {
  constructor() {
    this.emailData = void 0;
    this.emailData = [];
  }

  async sendMail(data) {
    this.emailData.push({ ...data
    });
  }

}

exports.MailProviderInMemory = MailProviderInMemory;