import { RequestHandler } from 'express';

export interface LoginData {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export const apiLogoutUser: RequestHandler = async (req, res, next) => {
  res.clearCookie('JWT_TOKEN', {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: 'none',
  });

  // Respond with a success message or redirect to the login page
  res.status(200).json({ message: 'Logged out successfully' });
};
