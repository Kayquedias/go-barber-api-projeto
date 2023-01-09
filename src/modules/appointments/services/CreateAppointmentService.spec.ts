import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: IAppointmentsRepository
let fakeNotificationsRepository: INotificationsRepository
let fakeCacheProvider: ICacheProvider
let createAppointmentService: CreateAppointmentService

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 1, 12, 15).getTime()
    })

    const appointment = await createAppointmentService.execute({
      date: new Date(2023, 1, 15, 8),
      providerId: 'providerId',
      userId: 'userId',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('providerId')
  })

  it('should not be able to create an appointment with same hour', async () => {
    const appointmentDate = new Date(2023, 10, 2, 14)

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: 'providerId',
      userId: 'userId',
    })

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: 'providerId',
        userId: 'userId',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 1, 12, 15).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2023, 1, 10, 14),
        providerId: 'providerId',
        userId: 'userId',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 1, 12, 15).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2023, 1, 13, 16),
        providerId: 'userId',
        userId: 'userId',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8a.m and after 17p.m', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 1, 12, 15).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2023, 1, 13, 7),
        providerId: 'providerId',
        userId: 'userId',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointmentService.execute({
        date: new Date(2023, 1, 13, 18),
        providerId: 'providerId',
        userId: 'userId',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
