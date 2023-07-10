import axios from 'axios';
import React, { useRef } from 'react';
import SignIn from './SignIn';
import { authActions } from '@redux/slices/authSlice';
import { RootState, useAppDispatch } from '@redux/store/index';
import { useNavigate } from 'react-router-dom';
import { DOMAIN } from '@constants';

export const SignInContainer = () => {
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setAlert, clearAlert, login } = authActions;

  const handleInput = () => {
    // Clear error if user start typing in inputs
    dispatch(clearAlert());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataToSend = {
      emailOrUsername: data.get('emailOrUsername'),
      password: data.get('password'),
      isChecked: checkboxRef.current?.checked,
    };

    axios
      .post(`${DOMAIN}/api/v1/login`, dataToSend, { withCredentials: true })
      .then(() => {
        navigate('/dashboard', { replace: true });
        dispatch(login());
      })
      .catch((e) => {
        const customError = e.response.data.error;
        if (customError) {
          dispatch(setAlert({ message: customError, severity: 'error' }));
        } else {
          dispatch(setAlert(e.message));
        }
      });
  };

  return (
    <SignIn
      {...{
        handleSubmit,
        checkboxRef,
        handleInput,
      }}
    />
  );
};
