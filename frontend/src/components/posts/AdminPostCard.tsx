import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { PostData } from '@types';
import type { FC } from 'react';
import { shortenString } from '../../utils';

interface AdminPostCardProps {
  post: PostData;
  handleDelete: (id: string) => void;
  handleUpdate: (post: PostData) => void;
}

const AdminPostCard: FC<AdminPostCardProps> = ({
  post,
  handleDelete,
  handleUpdate,
}) => {
  const shortenedContent = shortenString(post.content, 100);

  return (
    <Paper
      key={post._id}
      sx={{
        width: '100%',
        margin: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'center',
        opacity: `${post.isFake ? '.5' : '1'}`,
        backgroundColor: `${post.isFake ? '#d3e4f6' : 'inherit'}`,
      }}
    >
      <Box>
        <Typography variant="h6" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2">{shortenedContent}</Typography>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          onClick={() => handleUpdate(post)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => handleDelete(post._id)}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};
export default AdminPostCard;
