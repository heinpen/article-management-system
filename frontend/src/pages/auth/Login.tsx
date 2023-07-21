import { useLoginUserMutation } from '@services/authApi';
import type { FC } from 'react';
import AlertWrapper from '@components/ui/AlertWrapper';
import AuthWrapper from '@components/auth/AuthWrapper';
import LoginForm from '@components/auth/LoginForm';
import AuthHeader from '@components/auth/AuthHeader';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();

  const [triggerLogin, response] = useLoginUserMutation();
  const { data, error, isLoading, isSuccess, reset } = response;
  if (isSuccess) {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
  return (
    <AuthWrapper>
      <AuthHeader title="Login" />
      <AlertWrapper data={data} error={error} isLoading={isLoading} />
      <LoginForm handleSubmit={triggerLogin} reset={reset} />
    </AuthWrapper>
  );
};
export default Login;
