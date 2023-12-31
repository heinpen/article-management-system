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
const LazyPost = lazy(() => import('../pages/Post'));

const LazyLogin = lazy(() => import('../pages/auth/Login'));
const LazyRegistration = lazy(() => import('../pages/auth/Registration'));
const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* Public routes */}
      <Route index element={<Navigate to="posts" />} />
      <Route path="posts" element={<LazyPosts />} />
      <Route path="posts/:postId" element={<LazyPost />} />

      <Route path="posts/page/:page" element={<LazyPosts />} />
      <Route path="login" element={<LazyLogin />} />
      <Route path="registration" element={<LazyRegistration />} />
      {/* Private routes */}
      <Route element={<RequireAuth allowedRole={'admin'} />}>
        <Route path="admin-posts" element={<LazyAdminDashboard />} />

        <Route path="admin-posts/page/:page" element={<LazyAdminDashboard />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="posts" />} />
    </Route>,
  ),
);
