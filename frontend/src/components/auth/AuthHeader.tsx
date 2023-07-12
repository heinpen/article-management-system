import { Avatar, Typography } from '@mui/material';
import type { FC } from 'react';

interface AuthHeaderProps {
  title: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  );
};
export default AuthHeader;
