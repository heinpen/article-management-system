import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import Posts from '../pages/Posts';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route index element={<Posts />} />
      {/* Private routes */}
      <Route element={<RequireAuth allowedRole={'admin'} />}>
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
);
