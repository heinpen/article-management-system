import { RequestHandler } from 'express';
import { loginUser } from '../services/login.service';

interface LoginData {
  emailOrUsername: string;
  password: string;
  isChecked: boolean;
}

export const apiLoginUser: RequestHandler = async (req, res, next) => {
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
    next(err);
  }
};
