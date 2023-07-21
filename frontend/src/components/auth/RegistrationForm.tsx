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
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

interface RegistrationFormProps {
  handleSubmit: (data: RegistrationData) => void;
  reset: () => void;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Username can only contain alphanumeric characters',
    )
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{6,30}$/,
      'Password must be between 6 and 30 characters and contain only alphanumeric characters',
    )
    .required('Password is required'),
  isAdmin: Yup.boolean().required(),
});

const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
  reset,
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      isAdmin: false,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    // Clear error if user start typing in inputs
    reset();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          {...formik.getFieldProps('email')}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleInput}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          {...formik.getFieldProps('username')}
          margin="normal"
          required
          fullWidth
          id="username"
          label="User name"
          name="username"
          autoComplete="username"
          onChange={handleInput}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          {...formik.getFieldProps('firstName')}
          margin="normal"
          required
          fullWidth
          id="first-name"
          label="First name"
          name="firstName"
          autoComplete="given-name"
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          {...formik.getFieldProps('lastName')}
          margin="normal"
          required
          fullWidth
          id="last-name"
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          {...formik.getFieldProps('password')}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <FormControlLabel
          control={
            <Checkbox {...formik.getFieldProps('isAdmin')} color="primary" />
          }
          label="is admin"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              onClick={() => reset()}
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
