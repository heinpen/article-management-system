import AuthHeader from '@components/auth/AuthHeader';
import AuthWrapper from '@components/auth/AuthWrapper';
import LoginForm from '@components/auth/LoginForm';
import AlertWrapper from '@components/ui/AlertWrapper';
import { useLoginUserMutation } from '@services/authApi';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();

  const [triggerLogin, response] = useLoginUserMutation();
  const { data, error, isLoading, isSuccess, reset } = response;
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
  }, [isSuccess, navigate]);
  return (
    <AuthWrapper>
      <AuthHeader title="Login" />
      <AlertWrapper data={data} error={error} isLoading={isLoading} />
      <LoginForm handleSubmit={triggerLogin} reset={reset} />
    </AuthWrapper>
  );
};
export default Login;
