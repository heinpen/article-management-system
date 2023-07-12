import { useRegisterUserMutation } from '@services/authApi';
import type { FC } from 'react';
import AlertWrapper from '@components/auth/AlertWrapper';
import AuthWrapper from '@components/auth/AuthWrapper';
import RegistrationForm from '@components/auth/RegistrationForm';
import AuthHeader from '@components/auth/AuthHeader';
import { useNavigate } from 'react-router-dom';

const Registration: FC = () => {
  const navigate = useNavigate();
  const [triggerRegistration, response] = useRegisterUserMutation();
  const { data, error, isLoading, reset, isSuccess } = response;
  if (isSuccess) {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }
  return (
    <AuthWrapper>
      <AuthHeader title="Registration" />
      <AlertWrapper data={data} error={error} isLoading={isLoading} />
      <RegistrationForm handleSubmit={triggerRegistration} reset={reset} />
    </AuthWrapper>
  );
};
export default Registration;
