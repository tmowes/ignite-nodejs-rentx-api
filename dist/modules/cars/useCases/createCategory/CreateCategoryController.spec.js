"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)('admin', 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at, updated_at )
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', '123456789', true, 'now()', 'now()')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a new category', async () => {
    const {
      body
    } = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      token
    } = body;
    const {
      status
    } = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category Supertest Name',
      description: 'Category Supertest Description'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(status).toBe(201);
  });
  it('should not be able to create a new category with same name', async () => {
    const {
      body
    } = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      token
    } = body;
    const {
      status
    } = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category Supertest Name',
      description: 'Category Supertest Description'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(status).toBe(400);
  });
});