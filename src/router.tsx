import { createBrowserRouter } from 'react-router-dom';
import Landing from './Landing';
import Login from './auth/login/Login';
import Signup from './auth/signup/Signup';

const COMMON_ROUTES = [
  {
    path: '/',
    element: <Landing />,
  },
];

export const LOGGED_OUT_ROUTER = createBrowserRouter([
  ...COMMON_ROUTES,
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);
export const LOGGED_IN_ROUTER = createBrowserRouter([...COMMON_ROUTES]);
