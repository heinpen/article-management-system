import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

class UserController {
  static apiRegisterUser: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      const { password, username, email } = req.body;

      // Hash password
      data.password = await bcrypt.hash(password, 5);

      const usernameExists = (await User.findOne({ username }).exec()) !== null;
      const userEmailExists = (await User.findOne({ email }).exec()) !== null;

      if (userEmailExists) {
        res.json({
          done: false,
          message: 'Account with the same email already exist',
        });
        return;
      }

      if (usernameExists) {
        res.json({
          done: false,
          message: 'Account with the same username already exist',
        });
        return;
      }

      const newUser = new User(data);
      newUser
        .save()
        .then(() => res.json({ done: true }))
        .catch((err) => res.status(400).json('Alert: ' + err));
    } catch (err) {
      res.send(err);
    }
  };

  static apiLoginUser: RequestHandler = async (req, res) => {
    try {
      const { emailOrUsername, password, isChecked } = req.body;
      if (!process.env.TOKEN_KEY) throw new Error('Token key is missing');

      const user = await User.findOne({
        $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
      }).exec();

      if (user !== null) {
        const { password: hash, email, firstName } = user;

        const isMatch = bcrypt.compareSync(password, hash);

        if (isMatch) {
          let token;

          if (isChecked) {
            token = jwt.sign({ email }, process.env.TOKEN_KEY);
          } else {
            // Create expired token
            token = jwt.sign({ email }, process.env.TOKEN_KEY, {
              expiresIn: 60 * 60 * 12,
            });
          }

          res.cookie(
            `JWT_TOKEN=Bearer ${token}; httponly; SameSite=None; Secure="true"`,
            `${firstName}`
          );
          res.json({ message: 'Token successfully set' });
        } else {
          // res.json({done: false, message: 'Wrong password'});
          res.status(400).json({
            error: { status: 400, data: { message: 'Wrong password' } },
          });
        }
      } else {
        res.json({
          done: false,
          message:
            'No user found. Please verify your credentials or consider registering',
        });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json({ error: { status: 400, message: e.message } });
      }
    }
  };

  static apiGetUser: RequestHandler = async (req, res) => {
    try {
      const { email } = res.locals;
      console.log(res.locals);
      const user = await User.findOne({ email }).exec();
      if (!user) throw new Error('User not found');

      const { username, firstName, lastName } = user;

      res.status(200);
      res.json({ username, firstName, lastName });
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json({ error: { status: 400, message: e.message } });
      }
    }
  };
}

export default UserController;
