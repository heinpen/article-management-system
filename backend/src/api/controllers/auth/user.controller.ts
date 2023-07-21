import { RequestHandler } from 'express';
import { CustomError } from '../../middleware/errorHandler';
import { findUserByEmail } from '../../services/auth/user.service';

export const apiGetUser: RequestHandler = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const user = await findUserByEmail(email);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const { password, ...userToSend } = user.toObject();

    res.json({ user: userToSend });
  } catch (err) {
    next(err);
  }
};
