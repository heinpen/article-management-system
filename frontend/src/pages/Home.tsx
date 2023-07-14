import Layout from '@components/Layout/Layout';
import PostList from '@components/posts/PostList';
import SkeletonList from '@components/posts/SkeletonList';

import { Box, Pagination, Typography } from '@mui/material';
import { useGetPostsMutation } from '@services/postsApi';
import { useEffect, type FC } from 'react';

interface HomeProps {}

const Home: FC = () => {
  const [trigger, response] = useGetPostsMutation();
  const { data, error, isLoading } = response;

  useEffect(() => {
    trigger(1);
    console.log('render');
  }, [trigger]);

  console.log(data);
  return (
    <Layout>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1, my: 2 }}
      >
        Posts
      </Typography>

      {data && <PostList posts={data.posts} />}
      <Pagination
        count={data?.pagination.totalPages}
        variant="outlined"
        shape="rounded"
        onChange={(e, n) => {
          trigger(n);
        }}
        sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
      />
    </Layout>
  );
};
export default Home;
