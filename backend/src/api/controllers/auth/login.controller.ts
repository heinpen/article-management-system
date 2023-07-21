import { RequestHandler } from 'express';
import validateLoginData from '../../services/auth/loginDataValidation.service';
import loginUser from '../../services/auth/loginUser.service';

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
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
    });

    res.json({ message: 'User successfully logged in' });
  } catch (err) {
    next(err);
  }
};
