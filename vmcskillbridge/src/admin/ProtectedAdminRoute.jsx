import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;