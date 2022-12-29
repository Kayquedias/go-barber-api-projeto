import { verify } from 'crypto'
import { Request, Response, NextFunction } from 'express'

import AppError from '@shared/errors/AppError'
import auth from 'src/config/auth'

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, auth.jwt.secret)

    next()
  } catch (err) {
    new AppError('Invalid Token.', 401)
  }
}
