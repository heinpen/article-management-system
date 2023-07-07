import { RequestHandler } from 'express';
import { CustomError, registerUser } from '../services/register.service';

interface RegisterData {
  username: string;
  password: string;
  email: boolean;
}

export const apiRegisterUser: RequestHandler = async (req, res) => {
  try {
    const data: RegisterData = req.body;

    const result = await registerUser(data);

    res.json(result);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
