import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import AppError from '@shared/infra/errors/AppError'

let fakeUsersRepository: IUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe('Authenticate User', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'joel',
      email: 'palhaco@gsd.com.br',
      password: '123123',
    })

    const response = await authenticateUser.execute({
      email: 'palhaco@gsd.com.br',
      password: '123123',
    })

    expect(response.user).toEqual(user)
    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'user@gsd.com.br',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'fake',
      email: 'fake@fake.com',
      password: '123123',
    })

    await expect(
      authenticateUser.execute({
        email: 'fake@fake.com',
        password: 'fake password',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
