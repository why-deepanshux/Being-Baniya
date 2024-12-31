import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoutes = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Render the protected content if the user is logged in
};

export default ProtectedRoutes;
