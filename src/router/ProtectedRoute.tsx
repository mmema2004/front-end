import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { type ReactNode } from "react";

interface RouterProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: RouterProps) => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
