import { usePost } from '../utils/reactQuery';

export const useLogin = ({ username, password }) => usePost();
