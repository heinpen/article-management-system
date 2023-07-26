import Layout from '@components/Layout/Layout';
import AlertWrapper from '@components/ui/AlertWrapper';

import { Typography } from '@mui/material';
import { useGetPostQuery } from '@services/postsApi';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post: FC = () => {
  let { postId } = useParams();
  const navigate = useNavigate();
  if (!postId) {
    navigate('posts');
    return null;
  }
  const { data, isLoading, error } = useGetPostQuery(postId);

  return (
    <Layout>
      <AlertWrapper isLoading={isLoading} error={error} />
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ my: 2 }}
      >
        {data?.title}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        color="inherit"
        align="left"
        sx={{ my: 2 }}
      >
        {data?.content}
      </Typography>
    </Layout>
  );
};
export default Post;
