import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { randomUUID } from 'crypto'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { isEqual } from 'date-fns'

class FakeAppointmentsRepository {
  private appointments: Appointment[] = []

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
