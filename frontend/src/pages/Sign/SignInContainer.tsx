import React, { useCallback, useRef } from 'react';
import SignIn from './SignIn';
import { authActions } from '@redux/auth/authSlice';
import { useAppDispatch } from '@redux/store/index';

import { loginUser } from '@redux/auth/authTnunk';

const SignInContainer = () => {
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useAppDispatch();
  const { clearAlert } = authActions;

  const handleInput = () => {
    // Clear any error if a user starts typing in inputs
    dispatch(clearAlert());
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const dataToSend = {
        emailOrUsername: data.get('emailOrUsername'),
        password: data.get('password'),
        isChecked: checkboxRef.current?.checked,
      };

      dispatch(loginUser(dataToSend));
    },
    [dispatch],
  );

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

export default SignInContainer;
