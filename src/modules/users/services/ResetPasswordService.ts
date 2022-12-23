import { addHours, isAfter } from 'date-fns'

import AppError from '@shared/infra/errors/AppError'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokenRepository'
import UsersTokensRepository from '../infra/typeorm/repositories/UsersTokensRepository'

interface IRequest {
  token: string
  password: string
}
export default class ResetPasswordService {
  private usersRepository: IUsersRepository = new UsersRepository()

  private usersTokensRepository: IUsersTokensRepository =
    new UsersTokensRepository()

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

    //user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user)
  }
}
