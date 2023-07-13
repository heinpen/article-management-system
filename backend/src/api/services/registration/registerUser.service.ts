import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import { CustomError } from '../../middleware/errorHandler';
import { RegistrationData } from '../../controllers/register.controller';

const registerUser = async (data: RegistrationData) => {
  const { password, username, email } = data;
  console.log(data);
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 5);

  const usernameExists = (await User.findOne({ username }).exec()) !== null;
  const userEmailExists = (await User.findOne({ email }).exec()) !== null;

  if (userEmailExists) {
    throw new CustomError(409, 'Account with the same email already exists');
  }

  if (usernameExists) {
    throw new CustomError(409, 'Username already exists');
  }

  const newUser = new User({ ...data, password: hashedPassword });
  await newUser.save();

  return 'User registered successfully';
};

export default registerUser;
