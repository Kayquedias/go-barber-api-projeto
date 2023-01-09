import { format, getHours, isBefore, startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import Appointment from '../infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError'

interface IRequest {
  providerId: string
  userId: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ providerId, userId, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment on a past date')
    }

    if (userId === providerId) {
      throw new AppError('You cannot create an appointment for yourself')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 17pm'
      )
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(date, providerId)

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date,
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para dia ${dateFormatted}`,
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    )

    return appointment
  }
}

export default CreateAppointmentService
