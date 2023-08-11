import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginData } from '../../controllers/auth/login.controller';
import { CustomError } from '../../middleware/errorHandler';
import User from '../../models/user.model';

const loginUser = async (data: LoginData) => {
  const { emailOrUsername, password, rememberMe } = data;

  const SECRET_KEY =
    process.env.TOKEN_KEY || '';

  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
  }).exec();
  if (!user) {
    throw new CustomError(
      404,
      'No user found. Please verify your credentials or consider registering',
    );
  }

  const { password: hash, email } = user;
  const isPasswordValid = await bcrypt.compare(password, hash);

  if (!isPasswordValid) {
    throw new CustomError(401, 'Wrong password');
  }

  const token = rememberMe
    ? jwt.sign({ email }, SECRET_KEY, {
        expiresIn: '7d',
      })
    : jwt.sign({ email }, SECRET_KEY, { expiresIn: '1d' });

  return token;
};

export default loginUser;
