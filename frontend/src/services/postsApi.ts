import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DOMAIN } from '@constants';
import { LoginData, PostData, RegistrationData } from '@types';

interface FulfilledResponse {
  message: string;
}

interface RequestPostData {
  data: {
    title: string;
    content: string;
    author: string;
  };
}

interface UpdatePostData extends RequestPostData {
  id: string;
}

interface GetPostsResponse {
  pagination: {
    totalPages: number;
    totalPosts: number;
  };
  posts: PostData[];
}

interface GetPostResponse {
  data: PostData;
}

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${DOMAIN}/api/v1/` }),
  endpoints: (builder) => ({
    getPosts: builder.mutation<GetPostsResponse, number>({
      query: (pageId) => `posts?page=${pageId}`,
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<FulfilledResponse, RequestPostData>({
      query: (data) => ({
        url: 'posts',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    updatePost: builder.mutation<FulfilledResponse, UpdatePostData>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
    }),
    deletePost: builder.mutation<FulfilledResponse, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsMutation, useGetPostQuery } = postsApi;
