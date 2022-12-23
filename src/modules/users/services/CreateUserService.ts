import { User } from '../infra/typeorm/entities/User'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository = new UsersRepository(),
    private hashProvider: IHashProvider = new HashProvider()
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userEmail = await this.usersRepository.findByEmail(email)

    if (userEmail) {
      throw new Error('User already exists!')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
