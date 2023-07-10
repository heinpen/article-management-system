import { RouteObject } from 'react-router';
import { SignInContainer } from '../pages/Sign/SignInContainer';
import Sign from '../pages/Sign/Sign';
import { Navigate } from 'react-router-dom';
import SignUpContainer from '../pages/Sign/SignUpContainer';

export const protectedRoutes: RouteObject[] = [];

export const loginRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="login" replace />,
  },
  {
    path: 'register',
    element: (
      <Sign>
        <SignUpContainer />
      </Sign>
    ),
  },
  {
    path: 'login',
    element: (
      <Sign>
        <SignInContainer />
      </Sign>
    ),
  },
];
