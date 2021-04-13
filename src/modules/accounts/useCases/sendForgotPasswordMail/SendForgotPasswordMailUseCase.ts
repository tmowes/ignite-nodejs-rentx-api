import { SendForgotPasswordMailDTO } from '@modules/accounts/dtos/SendForgotPasswordMailDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute({
    email,
  }: SendForgotPasswordMailDTO): Promise<{ forgot_password_token: string }> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    )

    if (!user) {
      throw new AppError('User does not exists!', 400)
    }

    const token = uuidV4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token: token,
      user_id: user.id,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    }

    await this.mailProvider.sendMail({
      path: templatePath,
      subject: 'Recuperação de senha',
      to: email,
      variables,
    })

    return { forgot_password_token: token }
  }
}
