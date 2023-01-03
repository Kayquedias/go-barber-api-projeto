import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'

import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokenRepository'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: IUsersRepository
let fakeUsersTokensRepository: IUsersTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    fakeMailProvider = new FakeMailProvider()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository
    )
  })

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'test user',
      email: 'testuser@co.com',
      password: 'testuser123',
    })

    await sendForgotPasswordEmail.execute({
      email: 'testuser@co.com',
    })

    expect(sendEmail).toHaveBeenCalled()
  })

  it('should not be able to recover password from a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'test@test.co',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const token = jest.spyOn(fakeUsersTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'test user',
      email: 'testuser@co.com',
      password: 'testuser123',
    })

    await sendForgotPasswordEmail.execute({
      email: 'testuser@co.com',
    })

    expect(token).toHaveBeenCalledWith(user.id)
  })
})
