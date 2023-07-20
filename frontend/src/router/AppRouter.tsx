import {
  Navigate,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import Registration from '../pages/auth/Registration';
import RequireAuth from './RequireAuth';
import Login from '../pages/auth/Login';
import Home from '../pages/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route index element={<Home />} />
      {/* Private routes */}
      <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
);
