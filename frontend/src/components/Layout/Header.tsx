import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Header = memo(() => {
  console.log('render');
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
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="small">
            Sign in
          </Button>
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        </Stack>
      </Toolbar>
    </React.Fragment>
  );
});
Header.displayName = 'Header';

export default Header;
