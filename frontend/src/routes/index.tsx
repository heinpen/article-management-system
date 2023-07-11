import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Login, Registration } from '../pages/Sign';
import Layout from '../components/Layout';

export const protectedRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="articles" replace />,
  },
  {
    path: 'articles',
    element: <Layout />,
  },
];

export const loginRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="login" replace />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Registration />,
  },
];
