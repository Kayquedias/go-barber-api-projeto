import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
     this.ormRepository = getRepository(User)
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await getRepository(User).save(user)
    
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email }
    })
  }

  async list(): Promise<User[]> {
    return this.ormRepository.find()
  }
}

export default UsersRepository