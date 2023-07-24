import Layout from '@components/Layout/Layout';
import PostList from '@components/posts/PostList';

import AlertWrapper from '@components/ui/AlertWrapper';
import Search from '@components/ui/Search';
import Sort from '@components/ui/Sort';
import { usePostPageLogic } from '@hooks/usePostPageLogic';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { type FC } from 'react';

const Posts: FC = () => {
  const {
    data,
    error,
    isLoading,
    handleRead,
    handleSort,
    handlePagination,
    handleSearch,
    requestData,
    isFetching,
  } = usePostPageLogic();

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
          <AlertWrapper isLoading={isLoading || isFetching} error={error}></AlertWrapper>
        </Stack>
        <Box sx={{ my: 2 }}>
          <Sort handleSort={handleSort} sortData={data?.sortData} />
        </Box>
      </Stack>
      <Box sx={{ flex: 1, opacity: isFetching ? 0.5 : 1  }}>
        {data?.posts && (
          <PostList posts={data?.posts} handleRead={handleRead} />
        )}
      </Box>
      <Pagination
        count={data?.pagination.totalPages}
        variant="outlined"
        page={requestData.page}
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
