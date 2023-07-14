import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Search from '@components/ui/Search';
import { Box, Stack } from '@mui/material';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
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
}
