import AuthHeader from '@components/auth/AuthHeader';
import AuthWrapper from '@components/auth/AuthWrapper';
import RegistrationForm from '@components/auth/RegistrationForm';
import AlertWrapper from '@components/ui/AlertWrapper';
import { useRegisterUserMutation } from '@services/authApi';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration: FC = () => {
  const navigate = useNavigate();
  const [triggerRegistration, response] = useRegisterUserMutation();
  const { data, error, isLoading, reset, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [isSuccess, navigate]);

  return (
    <AuthWrapper>
      <AuthHeader title="Registration" />
      <AlertWrapper data={data} error={error} isLoading={isLoading} />
      <RegistrationForm handleSubmit={triggerRegistration} reset={reset} />
    </AuthWrapper>
  );
};
export default Registration;
