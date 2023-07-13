import { AuthState } from './redux/auth/authSlice';

export type LoginData = {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
};

export type RegistrationData = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type FulfilledResponse = {
  message: string;
};

export type RejectedResponse = {
  status: number;
  data: {
    message: string;
  };
};
