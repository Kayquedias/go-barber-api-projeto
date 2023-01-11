import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ListProvidersService from './ListProvidersService'

let fakeUserRepository: IUsersRepository
let fakeCacheProvider: ICacheProvider
let listProviders: ListProvidersService

describe('List Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviders = new ListProvidersService(
      fakeCacheProvider,
      fakeUserRepository
    )
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'user1',
      email: 'user1@gmail.com',
      password: '123123',
    })

    const user2 = await fakeUserRepository.create({
      name: 'user2',
      email: 'user2@gmail.com',
      password: '123123',
    })

    const loggedUser = await fakeUserRepository.create({
      name: 'loggedUser',
      email: 'loggedUser@gmail.com',
      password: '123123',
    })

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
