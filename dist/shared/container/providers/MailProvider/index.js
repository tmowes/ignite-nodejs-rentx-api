"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _SESMailProvider = require("./implementations/SESMailProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  s3: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};

_tsyringe.container.registerInstance('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);