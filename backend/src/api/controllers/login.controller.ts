import { RequestHandler } from 'express';
import loginUser from '../services/login/loginUser.service';
import validateLoginData from '../services/login/loginDataValidation.service';

export interface LoginData {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export const apiLoginUser: RequestHandler = async (req, res, next) => {
  try {
    const data: LoginData = req.body;

    validateLoginData(data);

    const token = await loginUser(data);

    res.cookie('JWT_TOKEN', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ message: 'User successfully logged in' });
  } catch (err) {
    next(err);
  }
};
