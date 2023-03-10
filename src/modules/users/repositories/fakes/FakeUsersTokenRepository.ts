import { randomUUID } from 'crypto'

import { IUsersTokensRepository } from '../IUsersTokenRepository'

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: randomUUID(),
      token: randomUUID(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token
    )

    return userToken
  }
}

export default FakeUsersTokensRepository
