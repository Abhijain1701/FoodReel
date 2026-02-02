import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const { user: foodPartnerUser } = useAuth();
  const { user: regularUser } = useUserAuth();

  // Allow access if either user type is logged in
  if (!foodPartnerUser && !regularUser) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
