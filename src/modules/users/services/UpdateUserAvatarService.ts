import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import StorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'

import { User } from '@modules/users/infra/typeorm/entities/User'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'

interface IRequest {
  user_id: string
  avatarFilename: string
}

export default class UpdateUserAvatarService {
  private usersRepository: IUsersRepository = new UsersRepository()
  private storageProvider: IStorageProvider = new StorageProvider()

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can chance avaaer.', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFIle(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName

    await this.usersRepository.save(user)

    return user
  }
}
