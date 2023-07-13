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
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import * as Yup from 'yup';
interface LoginFormProps {
  handleSubmit: (data: LoginData) => void;
  reset: () => void;
}

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required('Email or username is required'),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{6,30}$/,
      'Password must be between 6 and 30 characters and contain only alphanumeric characters',
    )
    .required('Password is required'),
});

const LoginForm: FC<LoginFormProps> = ({ handleSubmit, reset }) => {
  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: true,
    },
    validationSchema,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any error if a user starts typing in inputs
    formik.handleChange(e);
    reset();
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ m: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="emailOrUsername"
        label="Email Address or Username"
        autoComplete="email"
        autoFocus
        type="text"
        name="emailOrUsername"
        onChange={handleInput}
        onBlur={formik.handleBlur}
        value={formik.values.emailOrUsername}
        error={
          formik.touched.emailOrUsername &&
          Boolean(formik.errors.emailOrUsername)
        }
        helperText={
          formik.touched.emailOrUsername && formik.errors.emailOrUsername
        }
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
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <FormControlLabel
        control={
          <Checkbox {...formik.getFieldProps('rememberMe')} color="primary" />
        }
        label="remember me"
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
            onClick={() => reset()}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
