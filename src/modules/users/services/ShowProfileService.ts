import AppError from '@shared/infra/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'

import { User } from '../infra/typeorm/entities/User'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'

interface IRequest {
  user_id: string
}

export default class ShowProfileService {
  private usersRepository: IUsersRepository = new UsersRepository()

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }
    return user
  }
}
