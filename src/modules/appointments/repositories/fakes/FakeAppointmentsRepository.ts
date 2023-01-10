import { randomUUID } from 'crypto'
import { getDate, getDay, getMonth, getYear, isEqual } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import IAppointmentsRepository from '../IAppointmentsRepository'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  async findByDate(
    date: Date,
    providerId: string
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) && providerId === appointment.providerId
    )

    return findAppointment
  }

  async create({
    date,
    providerId,
    userId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: randomUUID(), date, providerId, userId })

    this.appointments.push(appointment)

    return appointment
  }
}

export default FakeAppointmentsRepository
