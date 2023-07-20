import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
  allowedRoles: string[];
}

interface User {
  roles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const user: User = {
    roles: [],
  };

  return user.roles.some((role: string) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default RequireAuth;
