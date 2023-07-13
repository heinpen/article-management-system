import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm: FC<LoginFormProps> = ({ handleSubmit, reset }) => {
  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
      isChecked: true,
    },
    validationSchema,

    onSubmit: (values) => {
      console.log(values);

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

      <FormControl
        error={formik.touched.isChecked && Boolean(formik.errors.isChecked)}
        component="fieldset"
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="isChecked"
              color="primary"
              checked={formik.values.isChecked}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label="Remember me"
        />
        {formik.touched.isChecked && formik.errors.isChecked && (
          <FormHelperText>{formik.errors.isChecked}</FormHelperText>
        )}
      </FormControl>

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
