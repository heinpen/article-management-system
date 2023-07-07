import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const apiAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const SECRET_KEY =
      process.env.TOKEN_KEY || 'jllgshllWEUJHGHYJkjsfjds90JKLHKJDFH2L341234';
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new Error('Token is missing');

    const email = jwt.verify(token, SECRET_KEY);
    res.locals.email = email as string;
    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      // 👉️ err is type Error here
      res.status(400).json({ error: { status: 400, message: e.message } });
    }
  }
};

export default apiAuthUser;
