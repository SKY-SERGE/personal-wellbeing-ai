
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Si en cours de chargement, on peut afficher un spinner ou rien
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wellness-primary"></div>
      </div>
    );
  }

  // Si pas d'utilisateur connecté, rediriger vers la page d'authentification
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Si utilisateur connecté, afficher les enfants (contenu protégé)
  return <>{children}</>;
};

export default PrivateRoute;
