import axios, { AxiosError } from 'axios';

const baseURL = 'http://localhost:3001/api';
const apiVersion = 'v1';

const createAxiosInstance = (apiV: string) =>
  axios.create({
    baseURL: `${baseURL}/${apiV}`,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const axiosInstance = createAxiosInstance(apiVersion);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      return Promise.reject(response);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
