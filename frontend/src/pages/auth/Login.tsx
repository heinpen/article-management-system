import { useLoginUserMutation } from '@services/authApi';
import type { FC } from 'react';
import AlertWrapper from '@components/auth/AlertWrapper';
import AuthWrapper from '@components/auth/AuthWrapper';
import LoginForm from '@components/auth/LoginForm';
import AuthHeader from '@components/auth/AuthHeader';

const Login: FC = () => {
  const [triggerLogin, response] = useLoginUserMutation();
  const { data, error, isLoading, reset } = response;
  return (
    <AuthWrapper>
      <AuthHeader title="Login" />
      <AlertWrapper data={data} error={error} isLoading={isLoading} />
      <LoginForm handleSubmit={triggerLogin} reset={reset} />
    </AuthWrapper>
  );
};
export default Login;
