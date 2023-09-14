import { Alert, CircularProgress } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { FulfilledResponse } from '@types';
import type { FC } from 'react';

interface AlertWrapperProps {
  isLoading: boolean;
  data?: FulfilledResponse | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
}

interface ResponseData {
  message: string;
}

const AlertWrapper: FC<AlertWrapperProps> = ({ isLoading, error, data }) => {

  let errorMessage = 'Something went wrong';

  if(error) {
    if ('status' in error && 'error' in error) {
      errorMessage = error.status === 'FETCH_ERROR' ? 'Network error' : error.error;
    } else {
      errorMessage = (error as ResponseData).message;
    }
  }

  return (
    <>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert
          variant="outlined"
          severity="error"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {errorMessage}
        </Alert>
      )}

      {data && (
        <Alert
          variant="outlined"
          severity="success"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {data.message}
        </Alert>
      )}
    </>
  );
};

export default AlertWrapper;
