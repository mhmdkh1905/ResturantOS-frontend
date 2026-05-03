import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated, isWaiter } from "../utils/auth";

export default function AdminWaiterRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin() && !isWaiter()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
