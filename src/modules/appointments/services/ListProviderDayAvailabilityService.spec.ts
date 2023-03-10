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

  it('should have ten hours of availability from provider', async () => {
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

    const availability = await listProviderDayAvailability.execute({
      providerId: 'provider',
      year: 2023,
      month: 3,
      day: 23,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 10, availability: false },
        { hour: 11, availability: false },
        { hour: 12, availability: false },
        { hour: 13, availability: false },
        { hour: 14, availability: false },
        { hour: 15, availability: true },
        { hour: 16, availability: true },
        { hour: 17, availability: false },
      ])
    )
  })
})
