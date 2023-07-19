import {
  Box,
  Button,
  Collapse,
  Grow,
  Paper,
  Stack,
  Typography,
  Zoom,
} from '@mui/material';
import { PostData, RequestData } from '@types';
import { FC } from 'react';
import AdminPostCard from './AdminPostCard';
import Slide from '@mui/material/Slide';
interface PostListProps {
  posts: PostData[];
  handleDelete: (id: string) => void;
  handleUpdate: (post: PostData) => void;
}

const AdminPostsList: FC<PostListProps> = ({
  posts,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {posts.map((post) => (
        <AdminPostCard
          key={post._id}
          post={post}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </Box>
  );
};

export default AdminPostsList;
