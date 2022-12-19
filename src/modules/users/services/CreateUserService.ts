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
    const repository = getRepository(User)
    const userEmail = await repository.findOne({
      where: { email }
    })
    console.log({ userEmail })

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