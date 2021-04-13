"use strict";

var _UsersRepositoryInMemory = require("../../repositories/inMemory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/inMemory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/InMemory/MailProviderInMemory");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProviderInMemory;
describe('Send Forgot Password E-mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it('should be able to send a forgot password e-mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');
    const createdNewUser = await usersRepositoryInMemory.create({
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null
    });
    await sendForgotPasswordMailUseCase.execute({
      email: createdNewUser.email
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to sendForgotPasswordMail with same name', async () => {
    await expect(sendForgotPasswordMailUseCase.execute({
      email: 'invaliduseremail@testexample.com'
    })).rejects.toEqual(new _AppError.default('User does not exists!', 400));
  });
  it('Should be able to create an userToken', async () => {
    const generateUsersToken = spyOn(usersTokensRepositoryInMemory, 'create');
    const createdNewUser = await usersRepositoryInMemory.create({
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null
    });
    await sendForgotPasswordMailUseCase.execute({
      email: createdNewUser.email
    });
    expect(generateUsersToken).toBeCalled();
  });
});