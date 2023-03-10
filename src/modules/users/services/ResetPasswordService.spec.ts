import AppError from '@shared/errors/AppError'

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'

import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokenRepository'

import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: IUsersRepository
let fakeUsersTokensRepository: IUsersTokensRepository
let fakeHashProvider: IHashProvider
let resetPassword: ResetPasswordService

describe('ResetPassword', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    fakeHashProvider = new HashProvider()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider
    )
  })
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test 0',
      email: 'test0@test.com',
      password: '123456',
    })
    const { token } = await fakeUsersTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      password: '123123',
      token,
    })

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(
      await fakeHashProvider.compareHash('123123', updateUser?.password ?? '')
    ).toBeTruthy()

    expect(generateHash).toHaveBeenCalledWith('123123')
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user'
    )
    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password after two hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test 0',
      email: 'test0@test.com',
      password: '123456',
    })

    const { token } = await fakeUsersTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
