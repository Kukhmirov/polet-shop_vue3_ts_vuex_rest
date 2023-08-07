import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import memoizeOne from "memoize-one";

const DEFAULT_REQUEST_TIMEOUT = 10000;
const BASE_URL = import.meta.env.VITE_API_URL;

interface API {
  get: AxiosInstance["get"];
  post: AxiosInstance["post"];
  put: AxiosInstance["put"];
  patch: AxiosInstance["patch"];
  delete: AxiosInstance["delete"];
}

const api = memoizeOne((config: AxiosRequestConfig = { baseURL: BASE_URL, headers: {} }): API => {
  const instance = axios.create({
    ...config,
    baseURL: BASE_URL,
    timeout: DEFAULT_REQUEST_TIMEOUT,
    paramsSerializer: {
      encode: (params: { [key: string]: string }) => {
        return new URLSearchParams(params).toString();
      },
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error(error);
      throw error;
    },
  );
    
  const { get, post, put, patch, delete: del } = instance;

  return { get, post, put, patch, delete: del };
});

export default api();