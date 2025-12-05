import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authData = localStorage.getItem("geo_app_auth");
  
  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const parsed = JSON.parse(authData);
    if (!parsed.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

