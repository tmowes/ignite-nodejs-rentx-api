"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteFile = async filename => {
  try {
    await _fs.default.promises.stat(filename);
  } catch {
    return;
  }

  await _fs.default.promises.unlink(filename);
};

exports.deleteFile = deleteFile;