import { container } from 'tsyringe'

import '@modules/users/providers/index'
import '@shared/container/providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokenRepository'
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationRepository
)
