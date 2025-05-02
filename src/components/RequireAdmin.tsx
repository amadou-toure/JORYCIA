import { useUser } from "../contexts/user.context"; // adapte selon ton projet
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser(); // tu dois avoir un contexte utilisateur

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAdmin;
