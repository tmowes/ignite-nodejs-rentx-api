import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory'

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/InMemory/MailProviderInMemory'
import AppError from '@shared/errors/AppError'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProviderInMemory: MailProviderInMemory

describe('Send Forgot Password E-mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    )
  })

  it('should be able to send a forgot password e-mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail')
    const createdNewUser = await usersRepositoryInMemory.create({
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null,
    })

    await sendForgotPasswordMailUseCase.execute({ email: createdNewUser.email })

    expect(sendMail).toHaveBeenCalled()
  })
  it('should not be able to sendForgotPasswordMail with same name', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute({
        email: 'invaliduseremail@testexample.com',
      })
    ).rejects.toEqual(new AppError('User does not exists!', 400))
  })
  it('Should be able to create an userToken', async () => {
    const generateUsersToken = spyOn(usersTokensRepositoryInMemory, 'create')

    const createdNewUser = await usersRepositoryInMemory.create({
      name: 'User Name Test',
      email: 'useremail@testexample.com',
      password: 'User Password Test',
      driver_license: 'USER_DRIVER_LICENSE_TEST',
      avatar: null,
    })

    await sendForgotPasswordMailUseCase.execute({ email: createdNewUser.email })

    expect(generateUsersToken).toBeCalled()
  })
})
