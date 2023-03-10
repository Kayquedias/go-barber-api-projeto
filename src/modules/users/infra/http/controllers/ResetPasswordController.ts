import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'
export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { password, token } = request.body

      const resetPasswordService = container.resolve(ResetPasswordService)

      await resetPasswordService.execute({
        token,
        password,
      })

      return response.status(204).json()
    } catch (err) {
      next(err)
    }
  }
}
