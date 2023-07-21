import { useGetUserDataQuery } from '@services/authApi';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
  allowedRole: string;
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { data, error } = useGetUserDataQuery();
  console.log(data, 'asd');
  const user = data?.user;
  return user?.role === allowedRole ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
