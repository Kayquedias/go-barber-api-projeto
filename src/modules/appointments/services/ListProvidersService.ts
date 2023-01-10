import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  userId: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      })

      await this.cacheProvider.save(
        `providers-list:${userId}`,
        JSON.stringify(users) // USAR CLASS TRANSFORMER
      )
    }

    return users
  }
}

export default ListProvidersService
