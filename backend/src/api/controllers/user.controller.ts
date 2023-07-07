import { RequestHandler } from 'express';
import { findUserByEmail } from '../services/user.service';
import { CustomError } from '../middleware/errorHandler';

export const apiGetUser: RequestHandler = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const user = await findUserByEmail(email);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const { username, firstName, lastName } = user;

    res.json({ username, firstName, lastName });
  } catch (err) {
    next(err);
  }
};
