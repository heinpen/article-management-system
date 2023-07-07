import { ErrorRequestHandler } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, customMessage: string) {
    super();
    if (customMessage) this.message = customMessage;
    this.statusCode = statusCode || 500;
  }
}

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  }
};
