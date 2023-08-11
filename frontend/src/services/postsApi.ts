import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PostData, RequestData, SortData } from '@types';

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
  sortData: SortData;
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

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_DOMAIN}/api/v1/` }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
      query: ({ page, search, sort }) =>
        `posts?page=${page}&search=${search}&sort=${sort}`,
      providesTags: ['Posts'],
    }),

    getPost: builder.query<PostData, string>({
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
      onQueryStarted: async (
        { data, requestData },
        { dispatch, queryFulfilled },
      ) => {
        const createResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            draft.posts.unshift({
              ...data,
              _id: String(Date.now()),
              date: String(Date.now()),
              createdAt: String(Date.now()),
              updatedAt: String(Date.now()),
              isFake: true,
            });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          queryFulfilled.catch(createResult.undo);
        }
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
      onQueryStarted: async (
        { id, data, requestData },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            const postIndex = draft.posts.findIndex((post) => post._id === id);
            draft.posts[postIndex].title = data.title;
            draft.posts[postIndex].content = data.content;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          queryFulfilled.catch(patchResult.undo);
        }
      },
    }),
    deletePost: builder.mutation<FulfilledResponse, DeleteData>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Posts'],
      onQueryStarted: ({ id, requestData }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', requestData, (draft) => {
            draft.posts = draft.posts.filter((post) => post._id !== id);
          }),
        );

        try {
          queryFulfilled;
        } catch {
          queryFulfilled.catch(patchResult.undo);
        }
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
