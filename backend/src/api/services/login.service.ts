import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface LoginData {
  emailOrUsername: string;
  password: string;
  isChecked: boolean;
}

export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, customMessage: string) {
    super();
    if (customMessage) this.message = customMessage;
    this.statusCode = statusCode || 500;
  }
}

export const loginUser = async (data: LoginData) => {
  const { emailOrUsername, password, isChecked } = data;

  const SECRET_KEY =
    process.env.TOKEN_KEY || 'jllgshllWEUJHGHYJkjsfjds90JKLHKJDFH2L341234';

  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
  }).exec();

  if (!user) {
    throw new CustomError(
      404,
      'No user found. Please verify your credentials or consider registering'
    );
  }

  const { password: hash, email } = user;
  const isPasswordValid = await bcrypt.compare(password, hash);

  if (!isPasswordValid) {
    throw new CustomError(401, 'Wrong password');
  }

  const token = isChecked
    ? jwt.sign({ email }, SECRET_KEY)
    : jwt.sign({ email }, SECRET_KEY, { expiresIn: 60 * 60 * 12 });

  return token;
};
