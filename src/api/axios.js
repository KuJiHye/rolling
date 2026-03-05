import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rolling-api.vercel.app/23-5/recipients', 
});

export default instance;