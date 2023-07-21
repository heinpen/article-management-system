import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useGetUserDataQuery, useLogoutUserMutation } from '@services/authApi';
import * as React from 'react';
import { memo, useEffect } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';

const Header = memo(() => {
  const { data } = useGetUserDataQuery();
  const navigate = useNavigate();

  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          Logo
        </Typography>

        <nav>
          <Link to="/" style={{ textDecoration: 'none', marginRight: '20px' }}>
            <Button color="inherit">Posts</Button>
          </Link>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Button color="inherit">Dashboard</Button>
          </Link>
        </nav>
        {!data?.user && (
          <Stack direction="row" spacing={2}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small">
                Log in
              </Button>
            </Link>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="small">
                Sign up
              </Button>
            </Link>
          </Stack>
        )}
        {data?.user && (
          <Button variant="contained" size="small" onClick={() => logoutUser()}>
            Log out
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
});
Header.displayName = 'Header';

export default Header;
