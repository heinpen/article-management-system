import { Grid } from '@mui/material';
import { PostData } from '@types';
import type { FC } from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostData[];
  handleRead: (post: PostData) => void;
}

const PostList: FC<PostListProps> = ({ posts, handleRead }) => {
  if (posts.length === 0) return <h1>No posts found</h1>;
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={3} key={post._id}>
          <PostCard post={post} handleRead={handleRead} />
        </Grid>
      ))}
    </Grid>
  );
};
export default PostList;
