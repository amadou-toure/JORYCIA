import { createContext, ReactNode, useContext, useState } from "react";
import { User, loginModel, UserContextType } from "../models/User.model.ts";
import UserService from "../services/User.service.ts";

const UserContext = createContext<UserContextType | undefined>(undefined);

// Define a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  //const navigate = useNavigate();
  const login = async (loginData: loginModel): Promise<void> => {
    setLoading(true);

    try {
      const response = await UserService.login(loginData);
      setUser(response.user);
      setLastFetched(new Date());
      localStorage.setItem("token", response.token);
      //if (response.user.role === "admin") {
      //  navigate("/admin");
      //} else {
      //  navigate("/");
      //}
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: User) => {
    setLoading(true);
    try {
      const response = await UserService.register(registerData);
      setUser(response);
      setLastFetched(new Date());
    } catch (error) {
      console.error("Registration failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLastFetched(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        lastFetched,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
