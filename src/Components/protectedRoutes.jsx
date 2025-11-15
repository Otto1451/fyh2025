import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuth";

export default function ProtectedRoute({ children }) {
  const user = useAuth();

  if (user === undefined) {
    // Firebase is still checking the login state
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
