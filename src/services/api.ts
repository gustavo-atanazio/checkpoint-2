import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};

  // Header obrigatório
  (config.headers as Record<string, string>)["X-App-Name"] = "ReactNativeClass";

  console.log("Request:", config.method, config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.log("Response:", error.response.status);
    }
    return Promise.reject(error);
  },
);

export function isAxiosErrorWithStatus(error: unknown): error is AxiosError {
  return (error as AxiosError | null)?.isAxiosError === true;
}

export default api;
