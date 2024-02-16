// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse, login } from 'services/apis/auth';

const useLogin = () => {
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>(
    (data) => login(data),
    {},
  );

  return loginMutation;
};

export default useLogin;
