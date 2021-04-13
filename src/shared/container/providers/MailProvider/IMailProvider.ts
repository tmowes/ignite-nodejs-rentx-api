import { SendMailDTO } from './dtos/SendMailDTO'

export interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>
}
