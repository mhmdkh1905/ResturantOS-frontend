import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated, isChef } from "../utils/auth";

export default function AdminChefRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin() && !isChef()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
