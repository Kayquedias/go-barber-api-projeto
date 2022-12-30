import { inject, injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

import mailConfig from 'config/mail'

@injectable()
class MailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
  }

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}

export default MailProvider
