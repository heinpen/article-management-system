import { CssBaseline } from '@mui/material';

import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const ProtectedRoutes = lazy(
  () => import('./components/Routers/ProtectedRouter'),
);
const LoginRoutes = lazy(() => import('./components/Routers/LoginRouter'));

const App = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        {isAuth ? <ProtectedRoutes /> : <LoginRoutes />}
      </Suspense>
    </>
  );
};

export default App;
