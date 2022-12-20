import { getRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
} 

export class CreateUserService {
  private usersRepository: IUsersRepository = new UsersRepository()

  async execute({ name, email, password }: IRequest) {
    const userEmail = await this.usersRepository.findByEmail(email)

    if (userEmail) {
      throw new Error("User already exists!")
    }

    const user = this.usersRepository.createUser({
      name, 
      email,
      password
    })

    return user;
  }
}