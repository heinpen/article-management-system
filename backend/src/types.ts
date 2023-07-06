import { NextFunction, Request, Response } from 'express';

export type ControllerRequestHandler = (
  req: CustomRequest,
  res: Response
) => Promise<void>;

export interface CustomRequest extends Request {
  user: object;
}

export type MiddlewareRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type UserData = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};
