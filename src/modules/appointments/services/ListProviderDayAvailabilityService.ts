import { getHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  availability: boolean
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
      })

    const hourStart = 8
    const currentDate = new Date(Date.now())

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        availability:
          !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availability
  }
}

export default ListProviderDayAvailabilityService
