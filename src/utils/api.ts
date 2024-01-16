import axios from 'axios';

const BASE_URL = process.env.REACT_APP_NODE_BASE_URL
  ? `${process.env.REACT_APP_NODE_BASE_URL}/api/v1`
  : `/api/v1`;

const client = axios.create({
  baseURL: BASE_URL,
});

const request = ({ ...options }) => {
  const requestOptions = {
    headers: {
      ...options.headers,
    },
    ...options,
  };

  return client(requestOptions);
};

export const api = {
  get: (url: string, params?: object) => request({ url, ...params }),
  post: <T>(url: string, data: T, params?: object) =>
    request({ url, method: 'post', data, params }),
  patch: (url: string, data: any, params?: object) =>
    request({ url, method: 'patch', data, params }),
  delete: (url: string, params?: object) =>
    request({ url, method: 'delete', params }),
  put: (url: string, data: any) => request({ url, method: 'put', data }),
  client,
};
