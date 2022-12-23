import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { CreateUserService } from './CreateUserService'

let fakeUsersRepository: IUsersRepository
let createUser: CreateUserService

describe('Create user', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123123123',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with an existing email', async () => {
    const userData = {
      name: 'test02',
      email: 'test02@test.com',
      password: '123123123',
    }

    await createUser.execute(userData)

    await expect(createUser.execute(userData)).rejects.toEqual(
      Error('User already exists!')
    )
  })
})
