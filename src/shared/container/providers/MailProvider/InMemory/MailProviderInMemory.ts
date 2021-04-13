import { SendMailDTO } from '../dtos/SendMailDTO'
import { IMailProvider } from '../IMailProvider'

export class MailProviderInMemory implements IMailProvider {
  private emailData: unknown[]
  constructor() {
    this.emailData = []
  }
  async sendMail(data: SendMailDTO): Promise<void> {
    this.emailData.push({ ...data })
  }
}
