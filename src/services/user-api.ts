import axios from 'axios'
import {User} from "../types/UserTypes";

export const userApi = {
  getUsers: () => axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
}
