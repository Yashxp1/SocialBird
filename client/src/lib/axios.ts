import axios, { AxiosInstance } from 'axios';

const baseURL: string =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api/v1'
    : '/v1';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
