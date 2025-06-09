import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, loginModel, UserContextType } from "../models/User.model.ts";
import UserService from "../services/User.service.ts";
import { Navigate } from "react-router-dom";
import { ErrorToast } from "./Toast.tsx";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

// Define a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const login = async (loginData: loginModel): Promise<void> => {
    setLoading(true);
    try {
      setUser(null);
      const response = await UserService.login(loginData);
      setUser(response.user);
      setLastFetched(new Date());
      localStorage.setItem("userId", response.user.id);
      localStorage.setItem("token", response.token);
      return response.user;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    getUsers();
  }, []);
  const fetchUser = async (): Promise<void> => {
    const response = await UserService.getUser(
      localStorage.getItem("userId") || ""
    );
    setUser(response);
  };
  const getUsers = async (): Promise<void> => {
    try {
      const response = await UserService.getUsers();
      setUsers(response);
    } catch (error) {
      ErrorToast("une erreur s'est produite: " + error);
    }
  };

  const register = async (registerData: User) => {
    setLoading(true);
    try {
      const response = await UserService.register(registerData);
      setUser(response);
      setLastFetched(new Date());
    } catch (error) {
      ErrorToast("Creation du compte echouer:" + error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLastFetched(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isLoading,
        lastFetched,
        login,
        register,
        logout,
        RequireAdmin,
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
