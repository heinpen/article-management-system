import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DOMAIN } from '@constants';
import { LoginData, RegistrationData, UserData } from '@types';

interface FulfilledResponse {
  message: string;
}

interface GetUserDataResponse {
  user: UserData;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${DOMAIN}/api/v1/` }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserData: builder.query<GetUserDataResponse, void>({
      query: () => ({
        url: 'user',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
    loginUser: builder.mutation<FulfilledResponse, LoginData>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(authApi.endpoints.getUserData.initiate());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logoutUser: builder.mutation<FulfilledResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
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

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserDataQuery,
  useLogoutUserMutation,
} = authApi;
