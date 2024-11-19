import { Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/public/Login';
import Dashboard from '../pages/private/Dashboard';
import Registration from '../pages/public/Auth/Registration';

export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
];

export const privateRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];

export const routeConfig = [
  // Public Routes
  ...publicRoutes,
  // Protected Routes
  {
    element: <PrivateRoute />,
    children: privateRoutes,
  },
  // Catch all route
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];
