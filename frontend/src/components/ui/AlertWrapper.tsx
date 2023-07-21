import { Alert, CircularProgress } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

import { FulfilledResponse } from '@types';
import type { FC } from 'react';

interface AlertWrapperProps {
  isLoading: boolean;
  data?: FulfilledResponse | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
}

interface ResponseData {
  error: string;
}

const AlertWrapper: FC<AlertWrapperProps> = ({ isLoading, error, data }) => {
  const message =
    error && 'status' in error
      ? (error.data as ResponseData).error
      : data?.message;

  return (
    <>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert
          variant="outlined"
          severity="error"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {message}
        </Alert>
      )}

      {data && (
        <Alert
          variant="outlined"
          severity="success"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertWrapper;
