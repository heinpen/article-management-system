import { RequestHandler } from 'express';
import { registerUser } from '../services/register.service';

interface RegisterData {
  username: string;
  password: string;
  email: boolean;
}

export const apiRegisterUser: RequestHandler = async (req, res, next) => {
  try {
    const data: RegisterData = req.body;

    const result = await registerUser(data);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
