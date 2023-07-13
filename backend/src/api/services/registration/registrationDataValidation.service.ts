import Joi from 'joi';
import { RegistrationData } from '../../controllers/register.controller';
import { CustomError } from '../../middleware/errorHandler';

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

const validateRegistrationData = (data: RegistrationData) => {
  const { error } = registrationSchema.validate(data);

  if (error) {
    throw new CustomError(403, error.message);
  }
};

export default validateRegistrationData;
