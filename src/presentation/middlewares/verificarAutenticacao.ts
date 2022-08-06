import auth from "core/shared/config/auth";
import { AppError } from "core/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function verificarAutenticacao(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: usuarioId } = verify(token, auth.secretToken) as IPayload;

    req.usuario = {
      id: usuarioId,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
