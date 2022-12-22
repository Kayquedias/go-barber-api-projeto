import { uuid } from 'uuidv4'

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUserRepository";

class FakeUsersRepository implements IUsersRepository{
  private users: User[] = []
 
  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)

    return user
  } 

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}

const fakeUsersRepository = new FakeUsersRepository()

console.log(fakeUsersRepository.create({name: 'teste', email: 'teset@gmail.com', password: '123123'})
)