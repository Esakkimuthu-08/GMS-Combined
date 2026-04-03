import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const RoleRoute = ({ allowedRoles, children }) => {
  const user = useAuthStore((state) => state.user);
  const role = user?.Role?.toLowerCase();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;