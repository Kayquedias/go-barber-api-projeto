import { getMongoRepository, MongoRepository } from 'typeorm'

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository'

import Notification from '../schemas/Notification'

class NotificationRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipientId,
    })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationRepository
