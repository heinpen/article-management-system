import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom';
import RequireAuth from './RequireAuth';

const LazyPosts = lazy(() => import('../pages/Posts'));
const LazyLogin = lazy(() => import('../pages/auth/Login'));
const LazyRegistration = lazy(() => import('../pages/auth/Registration'));
const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* Public routes */}
      <Route index element={<Navigate to="posts" />} />
      <Route path="posts" element={<LazyPosts />} />
      <Route path="posts/:page" element={<LazyPosts />} />
      <Route path="login" element={<LazyLogin />} />
      <Route path="registration" element={<LazyRegistration />} />
      {/* Private routes */}
      <Route element={<RequireAuth allowedRole={'admin'} />}>
        <Route path="admin" element={<LazyAdminDashboard />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="posts" />} />
    </Route>,
  ),
);
