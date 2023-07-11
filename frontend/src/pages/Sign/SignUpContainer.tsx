import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import { authActions } from '@redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@redux/store/index';
import { registerUser } from '@redux/auth/authTnunk';

const SignUpContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { clearAlert } = authActions;
  const isError = useSelector((state: RootState) => state.auth.alert.isActive);
  const isUserRegistered = useSelector(
    (state: RootState) => state.auth.isRegistered,
  );

  useEffect(() => {
    if (isUserRegistered) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [isUserRegistered, navigate]);

  const handleInput = () => {
    // Clear error if user start typing in inputs
    if (isError) return;
    dispatch(clearAlert());
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const dataToSend = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        username: data.get('username'),
      };

      dispatch(registerUser(dataToSend));
    },
    [dispatch],
  );

  return <SignUp {...{ handleSubmit, handleInput }}></SignUp>;
};

export default SignUpContainer;
