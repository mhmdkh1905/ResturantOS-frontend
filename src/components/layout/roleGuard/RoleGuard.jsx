import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoleGuard({ allowedRoles, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole') || 'admin'; // Default admin for testing

  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      navigate('/dashboard', { replace: true, state: { from: location } });
    }
  }, [userRole, allowedRoles, navigate, location]);

  if (!allowedRoles.includes(userRole)) {
    return null; // Or loading spinner
  }

  return children;
}
