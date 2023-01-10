import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import Appointment from '../infra/typeorm/entities/Appointment'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date, providerId: string): Promise<Appointment | undefined>
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>
}
