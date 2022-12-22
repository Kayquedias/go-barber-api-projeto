import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  list(): Promise<User[]>
}