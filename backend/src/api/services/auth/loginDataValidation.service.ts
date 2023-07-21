import Joi from 'joi';
import { LoginData } from '../../controllers/auth/login.controller';
import { CustomError } from '../../middleware/errorHandler';

const loginSchema = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  rememberMe: Joi.boolean().required(),
});

const validateLoginData = (data: LoginData) => {
  const { error } = loginSchema.validate(data);

  if (error) {
    throw new CustomError(403, error.message);
  }
};

export default validateLoginData;
