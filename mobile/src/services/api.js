import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.31.243:3131'
})

export default api;
