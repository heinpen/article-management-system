import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Link from '@mui/material/Link';
import { LoginData } from '@types';
import { FC, useCallback, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LoginFormProps {
  handleSubmit: (data: LoginData) => void;
  reset: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleSubmit, reset }) => {
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleInput = () => {
    // Clear any error if a user starts typing in inputs
    reset();
  };

  const handleLocalSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const dataToSend: LoginData = {
        emailOrUsername: data.get('emailOrUsername'),
        password: data.get('password'),
        isChecked: checkboxRef.current?.checked,
      };

      handleSubmit(dataToSend);
    },
    [handleSubmit],
  );

  return (
    <Box
      component="form"
      onSubmit={handleLocalSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
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
        Login
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
            onClick={handleInput}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
