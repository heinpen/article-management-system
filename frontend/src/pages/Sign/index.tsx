import Sign from './Sign';
import SignUpContainer from './SignUpContainer';
import SignInContainer from './SignInContainer';

export const Registration = () => {
  return (
    <Sign title="Registration">
      <SignUpContainer />
    </Sign>
  );
};

export const Login = () => {
  return (
    <Sign title="Login">
      <SignInContainer />
    </Sign>
  );
};
