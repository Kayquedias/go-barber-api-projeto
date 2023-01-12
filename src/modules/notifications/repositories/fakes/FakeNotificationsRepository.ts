import { randomUUID } from 'crypto'

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

export default class FakeNotificationsRepository {
  private notifications: Notification[] = []

  async create({
    recipientId,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: randomUUID(), recipientId, content })

    this.notifications.push(notification)

    return notification
  }
}
