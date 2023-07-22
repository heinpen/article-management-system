import { CookieOptions, RequestHandler } from 'express';
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

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
    };

    if (data.rememberMe) {
      // Set the cookie expiration to a longer duration (e.g., 7 days)
      cookieOptions.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    }

    res.cookie('JWT_TOKEN', token, cookieOptions);

    res.json({ message: 'User successfully logged in' });
  } catch (err) {
    next(err);
  }
};
