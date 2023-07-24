import { CssBaseline } from '@mui/material';

import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/AppRouter';
const Fallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <CssBaseline />
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
