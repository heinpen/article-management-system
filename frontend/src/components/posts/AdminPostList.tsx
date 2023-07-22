import { Box } from '@mui/material';
import { PostData } from '@types';
import { FC } from 'react';
import AdminPostCard from './AdminPostCard';

interface PostListProps {
  posts: PostData[];
  handleDelete: (id: string, e: React.MouseEvent<HTMLElement>) => void;
  handleUpdate: (post: PostData, e: React.MouseEvent<HTMLElement>) => void;
  handleClick: (post: PostData) => void;
}

const AdminPostsList: FC<PostListProps> = ({
  posts,
  handleDelete,
  handleUpdate,
  handleClick,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {posts.map((post) => (
        <AdminPostCard
          key={post._id}
          post={post}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleClick={handleClick}
        />
      ))}
    </Box>
  );
};

export default AdminPostsList;
