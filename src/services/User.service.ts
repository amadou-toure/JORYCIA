import axios from "axios";
import { User, loginModel } from "../models/User.model.ts";

const JORYCIA_API_URL = import.meta.env.VITE_API_URL;

const UserService = {
  login: async (data: loginModel) => {
    const response = await axios.post(JORYCIA_API_URL + "/user/login", data);
    const loginResponse = response.data;
    return loginResponse;
  },
  register: async (newUser: User) => {
    const response = await axios.post(JORYCIA_API_URL + "/user/", newUser); // Adjust the endpoint if necessary
    const user: User = response.data;
    return user;
  },
  logout: async () => {},
  getUser: async (ID: string) => {
    const response = await axios.get(JORYCIA_API_URL + `/user/${ID}`);
    const user: User = response.data;
    return user;
  },
  getUsers: async () => {
    const response = await axios.get(JORYCIA_API_URL + "/user/");
    const users: User[] = response.data;
    return users;
  },
  updateUser: async () => {},
};

export default UserService;
