import axios from 'axios';
const baseURL = 'http://13.126.202.112/api/v1/';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export default instance;
