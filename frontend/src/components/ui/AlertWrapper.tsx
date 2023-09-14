import { Alert, CircularProgress } from '@mui/material';

import { FulfilledResponse } from '@types';
import type { FC } from 'react';

interface AlertWrapperProps {
  isLoading: boolean;
  data?: FulfilledResponse | undefined;
  error: ResponseData;
}

interface ResponseData {
  error?: string;
  status?: string;
  message?: string;
}

const AlertWrapper: FC<AlertWrapperProps> = ({ isLoading, error, data }) => {
  const errorMessage =
    error && error.status
      ? error.status === 'FETCH_ERROR'
        ? 'Network Error'
        : error.error
      : error?.message;

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
