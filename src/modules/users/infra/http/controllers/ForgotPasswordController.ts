import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

class ForgotPasswordController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    )

    await sendForgotPasswordEmail.execute({ email })

    return res.status(204).json()
  }
}

export default ForgotPasswordController
