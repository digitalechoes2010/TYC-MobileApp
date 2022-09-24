import axios, {AxiosRequestConfig} from 'axios';
import ApiConfig from './apiConfig';
import {store} from '../store';

const fetchClient = () => {
  const defaultOptions = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  // Create instance
  // @ts-ignore
  let instance = axios.create(defaultOptions);
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = store.getState().AuthenticationReducer.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};
export const apiClient = {
  get(path: string) {
    return fetchClient().get(`${ApiConfig.BASE_URL}${path}`);
  },
  post(path: string, params: any, contentType?: AxiosRequestConfig) {
    return fetchClient().post(`${ApiConfig.BASE_URL}${path}`, params);
  },
  patch(path: string, params: any, contentType?: string) {
    return fetchClient().patch(`${ApiConfig.BASE_URL}${path}`, params);
  },
  delete(path: string) {
    return fetchClient().delete(`${ApiConfig.BASE_URL}${path}`);
  },
  upload(path: string, params: any) {
    return fetchClient().post(`${ApiConfig.BASE_URL}${path}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
export default apiClient;
