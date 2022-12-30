import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeBCryptHashProvider'
import AppError from '@shared/errors/AppError'
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test05',
      email: 'test05@test.com',
      password: '123456',
    })

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'test06',
      email: 'test06@test.com',
    })

    expect(updateUser.name).toBe('test06')
    expect(updateUser.email).toBe('test06@test.com')
  })

  it('should not be able show the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@test.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change the email to another existing email', async () => {
    await fakeUsersRepository.create({
      name: 'test05',
      email: 'test05@test.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'test06',
      email: 'test06@test.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'test06',
        email: 'test05@test.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test05',
      email: 'test05@test.com',
      password: '123456',
    })

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'test06',
      email: 'test06@test.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updateUser.password).toBe('123123')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test05',
      email: 'test05@test.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'test06',
        email: 'test06@test.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test05',
      email: 'test05@test.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'test06',
        email: 'test06@test.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
