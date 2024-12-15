import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const fetchQuery =
  <TResponse>(params: AxiosRequestConfig) =>
  async () => {
    const response = (await Axios(params)) as AxiosResponse<TResponse>;
    return response.data;
  };
