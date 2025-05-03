import { useUser } from "../contexts/user.context";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  console.log(user);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAdmin;
