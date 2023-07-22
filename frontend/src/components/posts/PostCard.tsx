import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PostData } from '@types';
import { FC } from 'react';
import { shortenString } from '../../utils';

interface PostCardProps {
  post: PostData;
  handleRead: (post: PostData) => void;
}

const PostCard: FC<PostCardProps> = ({ post, handleRead }) => {
  const { title, content, date } = post;
  const shortenedContent = shortenString(content, 100);
  const formattedDate = new Date(date).toLocaleDateString('en-US');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortenedContent}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardActions>
          <Button size="small" onClick={() => handleRead(post)}>
            Read more
          </Button>
        </CardActions>

        <Typography sx={{ p: 2 }} variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
      </Box>
    </Card>
  );
};

export default PostCard;
