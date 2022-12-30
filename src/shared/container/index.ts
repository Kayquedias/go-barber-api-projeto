import { container } from 'tsyringe'

import '@modules/users/providers/index'
import '@shared/container/providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokenRepository'
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)
