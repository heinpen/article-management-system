import { DOMAIN } from '@constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface LoginData {
  emailOrUsername: string;
  password: string;
  isChecked: boolean;
}

interface RegistrationData {
  username: string;
  password: string;
  email: boolean;
  firstName: string;
  lastName: string;
}

// interface FulfilledResponse {
//   message: string;
// }

export const loginUser = createAsyncThunk<
  string,
  LoginData,
  { rejectValue: string }
>('auth/login', async (dataToSend, { fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await axios.post(`${DOMAIN}/api/v1/login`, dataToSend, {
      withCredentials: true,
    });
    return fulfillWithValue(response.data.message);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue('Unknown error occurred');
    }
  }
});

export const registerUser = createAsyncThunk<
  string,
  RegistrationData,
  { rejectValue: string }
>(
  'auth/register',
  async (dataToSend, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${DOMAIN}/api/v1/register`,
        dataToSend,
      );
      return fulfillWithValue(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Unknown error occurred');
      }
    }
  },
);
