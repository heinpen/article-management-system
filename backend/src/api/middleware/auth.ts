import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// type RequestHandler = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => Promise<void>;

// export interface CustomRequest extends Request {
//   data: {
//     email: string;
//   };
// }

const apiAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new Error('Token is missing');
    if (!process.env.TOKEN_KEY) throw new Error('Token key is missing');

    const email = jwt.verify(token, process.env.TOKEN_KEY);
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
