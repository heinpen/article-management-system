import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Link from '@mui/material/Link';
import { RegistrationData } from '@types';
import { FC, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface RegistrationFormProps {
  handleSubmit: (data: RegistrationData) => void;
  reset: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
  // handleInput,
  reset,
}) => {
  const handleLocalSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const dataToSend: RegistrationData = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        username: data.get('username'),
      };
      console.log(dataToSend);
      handleSubmit(dataToSend);
    },
    [handleSubmit],
  );

  const handleInput = () => {
    // Clear error if user start typing in inputs
    reset();
  };

  return (
    <>
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
          Registration
        </Button>
        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              onClick={handleInput}
            >
              {'Have account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RegistrationForm;
