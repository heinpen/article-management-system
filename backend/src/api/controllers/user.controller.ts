import { RequestHandler } from 'express';
import { findUserByEmail, CustomError } from '../services/user.service';

export const apiGetUser: RequestHandler = async (req, res) => {
  try {
    const email = res.locals.email;
    const user = await findUserByEmail(email);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const { username, firstName, lastName } = user;

    res.json({ username, firstName, lastName });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
