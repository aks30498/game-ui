// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, SignupRequest, signup } from '../apis/auth';

const useSignup = () => {
  const loginMutation = useMutation<LoginResponse, Error, SignupRequest>(
    (data) => signup(data),
    {},
  );

  return loginMutation;
};

export default useSignup;
