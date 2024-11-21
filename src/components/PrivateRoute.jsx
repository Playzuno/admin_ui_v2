import { Navigate, Outlet } from 'react-router-dom';
import BusinessProvider from '../hooks/BusinessProvider';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('userInfo');
  return isAuthenticated ? (
    <BusinessProvider>
      <Outlet />
    </BusinessProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
