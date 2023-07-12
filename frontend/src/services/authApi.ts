import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DOMAIN } from '@constants';
import { LoginData, RegistrationData } from '@types';

interface FulfilledResponse {
  message: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${DOMAIN}/api/v1/` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<FulfilledResponse, LoginData>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    registerUser: builder.mutation<FulfilledResponse, RegistrationData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
