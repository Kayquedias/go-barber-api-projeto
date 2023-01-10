import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: IAppointmentsRepository
let fakeCacheProvider: ICacheProvider
let listProviderAppointmentService: ListProviderAppointmentsService

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointmentService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 3, 23, 15, 0, 0),
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2023, 3, 23, 16, 0, 0),
    })

    const appointments = await listProviderAppointmentService.execute({
      providerId: 'provider',
      year: 2023,
      month: 3,
      day: 23,
    })

    console.log(appointments)

    expect(appointments).toEqual([appointment1, appointment2])
  })
})
