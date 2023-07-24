import { useGetUserDataQuery } from '@services/authApi';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
  allowedRole: string;
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { data, isLoading } = useGetUserDataQuery();
  if (isLoading) {
    // If data is loading, you can return a loading indicator or null
    return null;
  }

  const user = data?.user;
  return user?.role === allowedRole ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
