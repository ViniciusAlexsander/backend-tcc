import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import createConnection from "../infra/typeorm";
import "../core/domain/container/index";

import { router } from "./controllers";
import { AppError } from "../core/shared/errors/AppError";

createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
});

app.listen(process.env.PORT || 3333, () => console.log("Server is running"));
