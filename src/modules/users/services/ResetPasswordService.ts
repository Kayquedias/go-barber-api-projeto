import { addHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/infra/errors/AppError'

import { IUsersRepository } from '../repositories/IUsersRepository'

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

import { IUsersTokensRepository } from '../repositories/IUsersTokenRepository'

import { injectable, inject } from 'tsyringe'

interface IRequest {
  token: string
  password: string
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreateAt = userToken.created_at
    const compareDate = addHours(tokenCreateAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}
