import { CookieOptions, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const apiAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const SECRET_KEY =
      process.env.TOKEN_KEY || 'jllgshllWEUJHGHYJkjsfjds90JKLHKJDFH2L341234';

    const { JWT_TOKEN } = req.cookies;

    if (!JWT_TOKEN) throw new Error('Token is missing');

    const { email } = jwt.verify(JWT_TOKEN, SECRET_KEY) as JwtPayload;

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12 * 7),
    };

    const newToken = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: '7d',
    });

    res.cookie('JWT_TOKEN', newToken, cookieOptions);

    res.locals.email = email as string;
    next();
  } catch (err) {
    next(err);
  }
};

export default apiAuthUser;
