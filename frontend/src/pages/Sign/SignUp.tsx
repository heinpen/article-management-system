import { FC, FormEvent } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

import { Button, Checkbox, Grid, TextField } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { authActions } from '@redux/auth/authSlice';
import { useAppDispatch } from '@redux/store/index';

interface SignUpProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInput: () => void;
}

const SignUp: FC<SignUpProps> = ({ handleSubmit, handleInput }) => {
  const { clearAlert } = authActions;
  const dispatch = useAppDispatch();

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInput}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="User name"
          name="username"
          autoComplete="username"
          onChange={handleInput}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="first-name"
          label="First name"
          name="firstName"
          autoComplete="given-name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="last-name"
          label="Last name"
          name="lastName"
          autoComplete="family-name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              onClick={() => dispatch(clearAlert())}
            >
              {'Have account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
