import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DOMAIN } from '@constants';
import { PostData, RequestData } from '@types';
import { current } from '@reduxjs/toolkit';

interface FulfilledResponse {
  message: string;
}

interface RequestPostData {
  data: {
    title: string;
    content: string;
  };
  requestData: RequestData;
}

interface UpdatePostData extends RequestPostData {
  id?: string;
}

interface GetPostsResponse {
  pagination: {
    totalPages: number;
    totalPosts: number;
  };
  sortingValues: {
    label: string;
    value: string;
  }[];
  posts: PostData[];
}

interface GetPostResponse {
  data: PostData;
}

interface GetPostsRequest {
  page?: number;
  search?: string;
  sort?: string;
}

interface DeleteData {
  id: string;
  requestData: RequestData;
}

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${DOMAIN}/api/v1/` }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
      query: ({ page, search, sort }) =>
        `posts?page=${page}&search=${search}&sort=${sort}`,
      providesTags: ['Posts'],
    }),

    getPost: builder.query<GetPostResponse, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<FulfilledResponse, RequestPostData>({
      query: ({ data }) => ({
        url: 'posts',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Posts'],
      onQueryStarted({ data, requestData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            draft.posts.unshift({
              ...data,
              _id: String(Date.now()),
              createdAt: String(Date.now()),
              updatedAt: String(Date.now()),
              isFake: true,
            });
          }),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updatePost: builder.mutation<FulfilledResponse, UpdatePostData>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Posts'],
      onQueryStarted({ id, data, requestData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            const postIndex = draft.posts.findIndex((post) => post._id === id);
            draft.posts[postIndex].title = data.title;
            draft.posts[postIndex].content = data.content;
          }),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    deletePost: builder.mutation<FulfilledResponse, DeleteData>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Posts'],
      onQueryStarted({ id, requestData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            draft.posts = draft.posts.filter((post) => post._id !== id);
          }),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreatePostMutation,
} = postsApi;
