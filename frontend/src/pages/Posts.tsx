import Layout from '@components/Layout/Layout';
import PostList from '@components/posts/PostList';

import AlertWrapper from '@components/ui/AlertWrapper';
import Search from '@components/ui/Search';
import Sort from '@components/ui/Sort';
import useDebounce from '@hooks/useDebounce';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useGetPostsQuery } from '@services/postsApi';
import { ChangeEvent, useEffect, useState, type FC } from 'react';

const Posts: FC = () => {
  const [requestData, setRequestData] = useState({
    page: 1,
    search: '',
    sort: '',
  });
  const { data, error, isLoading } = useGetPostsQuery(requestData);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  // Perform the search or update based on the debounced value
  useEffect(() => {
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
          <AlertWrapper isLoading={isLoading} error={error}></AlertWrapper>
        </Stack>
        <Box sx={{ my: 2 }}>
          <Sort handleSort={handleSort} sortData={data?.sortData} />
        </Box>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {data?.posts && <PostList posts={data?.posts} />}
      </Box>
      <Pagination
        count={data?.pagination.totalPages}
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
export default Posts;
