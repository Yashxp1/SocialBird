import axios, { AxiosInstance } from 'axios';

const baseURL: string =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : '/v1';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
