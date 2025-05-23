export interface loginModel {
  email: string;
  password: string;
}
export type UserContextType = {
  user: User | null;
  users: User[] | null;
  login: (loginData: loginModel) => Promise<void>;
  register: (registerData: User) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  lastFetched: Date | null;
  RequireAdmin: ({ children }: { children: JSX.Element }) => JSX.Element;
};
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LoginResponse {
  user: User;
  token: string;
}
export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}
