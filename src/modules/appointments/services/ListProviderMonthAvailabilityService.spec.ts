import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: IAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('List Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 25, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 5, 24, 11, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'provider',
      year: 2023,
      month: 5,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 22, availability: true },
        { day: 23, availability: true },
        { day: 24, availability: true },
        { day: 25, availability: false },
      ])
    )
  })
})
