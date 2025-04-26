
import axios from 'axios';
import {User,loginModel} from "../models/User.model.ts";

const JORYCIA_API_URL = 'http://localhost:3000';

const UserService = {
    login: async(data: loginModel)=> {
        const response = await axios.post(JORYCIA_API_URL + '/user/login', data)
        const user: User = response.data;
        return user;
    },
    register: async(newUser: User)=>{
        const response = await axios.post(JORYCIA_API_URL + '/user/login', newUser); // Adjust the endpoint if necessary
        const user: User = response.data;
        return user;
    },
    logout: async()=>{
    },
    getUser: async(ID: string)=>{
        const response = await axios.get(JORYCIA_API_URL + `/user/logout/${ID}`)
        const user: User = response.data;
        return user;
    },
    updateUser: async()=>{

    }

}

export default UserService;

