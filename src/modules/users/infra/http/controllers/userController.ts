import { NextFunction, Request, Response } from "express"
import { CreateUserService } from '@modules/users/services/CreateUserService'

export class UsersController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const createUserService = new CreateUserService()
      const { name, email, password } = req.body

      const user = await createUserService.execute({
        name,
        email,
        password
      })
      
      return res.json({user})
    } catch(err) {
      next(err)
    }
  }
}