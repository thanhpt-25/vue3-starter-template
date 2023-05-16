import type {AxiosResponse} from "axios";
import {Observable} from "rxjs";
import type {AxiosRequestConfig} from "axios";
export interface BaseRepositoryInterface {
  post<T = any>(data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  put<T= any>(data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  delete<T = any>(config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  get<T = any>(config?: AxiosRequestConfig,): Observable<AxiosResponse<T>>
  head<T = any>(config?: AxiosRequestConfig ): Observable<AxiosResponse<T>>
  request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>>
}
