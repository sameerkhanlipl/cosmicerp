import axios from 'axios';
const baseURL = 'https://13.126.202.112/api/v1/';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

export default instance;
