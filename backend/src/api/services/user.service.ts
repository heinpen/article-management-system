import User from '../models/user.model';
export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, customMessage: string) {
    super();
    if (customMessage) this.message = customMessage;
    this.statusCode = statusCode || 500;
  }
}

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email }).exec();
};
