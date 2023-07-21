import { useGetUserDataQuery } from '@services/authApi';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
  allowedRole: string;
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { data } = useGetUserDataQuery();

  const user = data?.user;
  if (!user) return <Navigate to="/login" />;
  return user?.role === allowedRole ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
