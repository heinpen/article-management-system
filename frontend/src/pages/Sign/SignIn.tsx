import { FC, FormEvent, MutableRefObject } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { authActions } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';

interface SignInProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  checkboxRef: MutableRefObject<HTMLInputElement>;
  handleInput: () => void;
}

const SignIn: FC<SignInProps> = ({
  handleSubmit,
  checkboxRef,
  handleInput,
}) => {
  const { clearAlert } = authActions;
  const dispatch = useAppDispatch();

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        id="email"
        label="Email Address or Username"
        name="emailOrUsername"
        autoComplete="email"
        autoFocus
        onChange={handleInput}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handleInput}
      />
      <FormControlLabel
        control={
          <Checkbox inputRef={checkboxRef} defaultChecked color="primary" />
        }
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            onClick={() => dispatch(clearAlert())}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
