import { inject, injectable } from 'tsyringe'

import path from 'path'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokenRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}
  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists', 400)
    }

    const { token } = await this.usersTokensRepository.generate(user.id)

    const pathToForgotPassword = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Go Barber] Recuperação de senha',
      templateData: {
        file: pathToForgotPassword,
        variables: {
          name: '',
          link: '',
        },
      },
    })
  }
}

export default SendForgotPasswordEmailService
