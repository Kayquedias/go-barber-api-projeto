import { sign } from 'jsonwebtoken'

import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { User } from '../infra/typeorm/entities/User'
import AppError from '@shared/infra/errors/AppError'

import authConfig from '../../../config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: User
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository = new UsersRepository(),
    private hashProvider: IHashProvider = new HashProvider()
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const isPasswordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
