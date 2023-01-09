import { getRepository, Raw, Repository } from 'typeorm'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointment'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  async findAllInDayFromProvider({providerId, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0')
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
      relations: ['user'],
    })

    return appointments
  }

  async findByDate(
    date: Date,
    providerId: string
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        providerId,
      },
    })

    return findAppointment
  }

  async create({
    providerId,
    userId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      providerId,
      userId,
      date,
    })

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository