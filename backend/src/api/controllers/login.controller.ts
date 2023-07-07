import { RequestHandler } from 'express';
import { CustomError, loginUser } from '../services/login.service';

interface LoginData {
  emailOrUsername: string;
  password: string;
  isChecked: boolean;
}

export const apiLoginUser: RequestHandler = async (req, res) => {
  try {
    const data: LoginData = req.body;

    const token = await loginUser(data);

    res.cookie('JWT_TOKEN', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ message: 'Token successfully set' });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
