import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../core/shared/config/auth';
import { AppError } from '../../core/shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, auth.secretToken) as IPayload;

    req.usuario = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
