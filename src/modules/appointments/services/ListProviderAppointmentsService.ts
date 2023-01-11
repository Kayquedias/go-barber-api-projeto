import { injectable, inject } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import Appointment from '../infra/typeorm/entities/Appointment'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          providerId,
          day,
          month,
          year,
        }
      )

      await this.cacheProvider.save(cacheKey, instanceToPlain(appointments))
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
