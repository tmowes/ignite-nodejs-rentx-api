import auth from '@config/auth'
import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'

export const ensureAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as {
      sub: string
    }

    request.user = { id: user_id }

    next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
