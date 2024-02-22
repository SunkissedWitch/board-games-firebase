import { useAuthStore } from "../contexts/AuthStore"
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoutes = () => {
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser)
  const isLoggedIn = Boolean(currentUser?.uid)
  
  if (isLoggedIn === undefined) {
    return null; // or loading indicator/spinner/etc
  }
  
  return isLoggedIn 
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />;
  
}