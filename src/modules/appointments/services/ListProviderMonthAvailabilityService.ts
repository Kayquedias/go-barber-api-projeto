import { getDay, getDaysInMonth, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  availability: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({ providerId, month, year }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        providerId,
        month,
        year,
      })

    const getNumberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: getNumberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDay(appointment.date) === day
      })

      return {
        day,
        availability:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      }
    })

    return availability
  }
}

export default ListProviderMonthAvailabilityService
