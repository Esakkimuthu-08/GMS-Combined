import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const role = user?.Role?.toLowerCase();

  if (isAuthenticated && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
};

export default PublicRoute;