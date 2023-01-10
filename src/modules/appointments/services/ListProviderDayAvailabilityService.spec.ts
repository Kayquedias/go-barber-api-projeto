import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: IAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should have ten days of availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 3, 23, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 3, 23, 16, 0, 0),
    })

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2023, 3, 10, 12).getTime())
  })
})
