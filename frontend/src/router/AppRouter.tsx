import { lazy, Suspense } from 'react';
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
      <Route
        path="posts"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyPosts />
          </Suspense>
        }
      />

      <Route
        path="login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLogin />
          </Suspense>
        }
      />
      <Route
        path="registration"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyRegistration />
          </Suspense>
        }
      />
      {/* Private routes */}
      <Route element={<RequireAuth allowedRole={'admin'} />}>
        <Route
          path="admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyAdminDashboard />
            </Suspense>
          }
        />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="posts" />} />
    </Route>,
  ),
);
