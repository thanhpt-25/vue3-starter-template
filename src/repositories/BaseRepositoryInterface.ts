import type { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import type { AxiosRequestConfig } from 'axios'
export interface BaseRepositoryInterface {
  post<T = any>(url:string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  put<T = any>(url:string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  delete<T = any>(url:string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  get<T = any>(url:string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  head<T = any>(url:string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>
  request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>>
}
