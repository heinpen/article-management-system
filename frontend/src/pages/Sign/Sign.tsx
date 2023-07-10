import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Alert, Avatar, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/index';
import Copyright from '../../components/Copyright';

interface SignProps {
  children: ReactNode;
}

const Sign: FC<SignProps> = ({ children }) => {
  const alert = useSelector((state: RootState) => state.auth.alert);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/*<LockOutlinedIcon/>*/}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {alert.isActive && (
          <Alert
            variant="outlined"
            severity={alert.severity}
            style={{ marginTop: '10px', width: '100%' }}
          >
            {alert.message}
          </Alert>
        )}

        {children}
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Sign;
