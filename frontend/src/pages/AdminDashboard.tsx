// import Layout from '@components/Layout/Layout';
// import AlertWrapper from '@components/ui/AlertWrapper';
// import Search from '@components/ui/Search';
// import Sort from '@components/ui/Sort';
// import { Typography, Stack, Box, Pagination } from '@mui/material';
// import { useGetPostsMutation } from '@services/postsApi';
// import { PostData } from '@types';
// import { ChangeEvent, useEffect, useState, type FC } from 'react';
// import useDebounce from '@hooks/useDebounce';
// import AdminPostsList from '@components/posts/AdminPostList';

// interface SortingValues {
//   label: string;
//   value: string;
// }

// interface PageData {
//   totalPages: number;
//   sortingValues: SortingValues[];
//   posts: PostData[];
// }

// const AdminDashboard: FC = () => {
//   const [getPosts, response] = useGetPostsMutation();
//   const { data, error, isLoading } = response;

//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   const [pageData, setPageData] = useState<PageData>({
//     totalPages: 0,
//     sortingValues: [],
//     posts: [],
//   });

//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSort = (value: string) => {
//     getPosts({ pageId: 1, searchTerm: debouncedSearchTerm, sortValue: value });
//   };

//   const handlePagination = (event: ChangeEvent<unknown>, n: number) => {
//     getPosts({ pageId: n, searchTerm: debouncedSearchTerm });
//     window.scrollTo(0, 0);
//   };

//   useEffect(() => {
//     if (data) {
//       setPageData({
//         totalPages: data.pagination.totalPages,
//         sortingValues: data.sortingValues,
//         posts: data.posts,
//       });
//     }
//   }, [data, setPageData]);

//   // Perform the search or update based on the debounced value
//   useEffect(() => {
//     getPosts({ pageId: 1, searchTerm: debouncedSearchTerm });
//   }, [debouncedSearchTerm, getPosts]);

//   return (
//     <Layout>
//       <Typography
//         component="h2"
//         variant="h5"
//         color="inherit"
//         align="center"
//         noWrap
//         sx={{ my: 2 }}
//       >
//         Posts
//       </Typography>
//       <Stack
//         direction="row"
//         spacing={2}
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Stack direction="row" spacing={2} sx={{ my: 2 }}>
//           <Search handleSearch={handleSearch} />
//           <AlertWrapper isLoading={isLoading} error={error}></AlertWrapper>
//         </Stack>
//         <Box sx={{ my: 2 }}>
//           <Sort
//             handleSort={handleSort}
//             sortingValues={pageData.sortingValues}
//           />
//         </Box>
//       </Stack>
//       <Box sx={{ flex: 1 }}>
//         {pageData.posts && <AdminPostsList posts={pageData.posts} />}
//       </Box>
//       <Pagination
//         count={pageData.totalPages}
//         variant="outlined"
//         shape="rounded"
//         onChange={handlePagination}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           my: 2,
//         }}
//       />
//     </Layout>
//   );
// };
// export default AdminDashboard;

import Layout from '@components/Layout/Layout';
import PostList from '@components/posts/PostList';

import Search from '@components/ui/Search';
import Sort from '@components/ui/Sort';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useGetPostsQuery } from '@services/postsApi';
import { ChangeEvent, useEffect, useState, type FC } from 'react';
import useDebounce from '@hooks/useDebounce';
import AlertWrapper from '@components/ui/AlertWrapper';
import { PostData } from '@types';
import AdminPostsList from '@components/posts/AdminPostList';

interface SortingValues {
  label: string;
  value: string;
}

interface PageData {
  totalPages: number;
  sortingValues: SortingValues[];
  posts: PostData[];
}

const AdminDashboard: FC = () => {
  const [requestData, setRequestData] = useState({
    page: 1,
    search: '',
    sort: '',
  });
  const { data, error, isLoading, isFetching } = useGetPostsQuery(requestData);

  console.log(data);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [pageData, setPageData] = useState<PageData>({
    totalPages: 0,
    sortingValues: [],
    posts: [],
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (value: string) => {
    setRequestData({ ...requestData, sort: value });
  };

  const handlePagination = (event: ChangeEvent<unknown>, n: number) => {
    setRequestData({ ...requestData, page: n });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (data) {
      setPageData({
        totalPages: data.pagination.totalPages,
        sortingValues: data.sortingValues,
        posts: data.posts,
      });
    }
  }, [data, setPageData]);

  // Perform the search or update based on the debounced value
  useEffect(() => {
    console.log(debouncedSearchTerm);
    setRequestData((prev) => ({
      ...prev,
      page: 1,
      search: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  return (
    <Layout>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ my: 2 }}
      >
        Posts
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Search handleSearch={handleSearch} />
          <AlertWrapper
            isLoading={isLoading || isFetching}
            error={error}
          ></AlertWrapper>
        </Stack>
        <Box sx={{ my: 2 }}>
          <Sort
            handleSort={handleSort}
            sortingValues={pageData.sortingValues}
          />
        </Box>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {pageData.posts && <AdminPostsList posts={pageData.posts} />}
      </Box>
      <Pagination
        count={pageData.totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      />
    </Layout>
  );
};
export default AdminDashboard;
