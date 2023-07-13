import { RequestHandler } from 'express';
import registerUser from '../services/registration/registerUser.service';
import validateRegistrationData from '../services/registration/registrationDataValidation.service';

export interface RegistrationData {
  username: string;
  password: string;
  email: boolean;
  firstName: string;
  lastName: string;
}

export const apiRegisterUser: RequestHandler = async (req, res, next) => {
  try {
    const data: RegistrationData = req.body;

    validateRegistrationData(data);

    const result = await registerUser(data);

    res.json({ message: result });
  } catch (err) {
    next(err);
  }
};
