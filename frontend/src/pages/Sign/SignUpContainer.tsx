import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import { authActions } from '@redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@redux/store/index';
import { DOMAIN } from '@constants';

const SignUpContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setAlert, clearAlert } = authActions;
  const isError = useSelector((state: RootState) => state.auth.alert.isActive);

  const handleInput = () => {
    // Clear error if user start typing in inputs
    if (isError) return;
    dispatch(clearAlert());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
    };

    axios
      .post(`${DOMAIN}/api/v1/register`, dataToSend)
      .then((res) => {
        const { message } = res.data;
        dispatch(setAlert({ message: message, severity: 'success' }));

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1000);
      })
      .catch((e) => {
        dispatch(
          setAlert({ message: e.response.data.message, severity: 'error' }),
        );
      });
  };

  return <SignUp {...{ handleSubmit, handleInput }}></SignUp>;
};

export default SignUpContainer;
