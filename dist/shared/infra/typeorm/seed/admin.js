"use strict";

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)('localhost');
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)('admin', 8);
  await connection.query(`INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at, updated_at )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', '123456789', true, 'now()', 'now()')`);
  await connection.close();
}

create().then(() => console.log('User admin created!'));