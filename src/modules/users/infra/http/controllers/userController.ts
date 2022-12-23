import { NextFunction, Request, Response } from 'express'

import { CreateUserService } from '@modules/users/services/CreateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export class UsersController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const createUserService = new CreateUserService()
      const { name, email, password } = req.body

      const user = await createUserService.execute({
        name,
        email,
        password,
      })

      return res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const usersRepository = new UsersRepository()
      const users = await usersRepository.list()

      return res.status(200).json({ users })
    } catch (err) {
      next(err)
    }
  }
}
