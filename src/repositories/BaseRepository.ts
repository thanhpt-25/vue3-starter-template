import type { BaseRepositoryInterface } from '@/repositories/BaseRepositoryInterface'
import axios from '@/modules/api/axios'
import Axios from 'axios'

import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  CancelTokenSource,
  AxiosInstance
} from 'axios'
import { Observable } from 'rxjs'
export class BaseRepository implements BaseRepositoryInterface {
  protected readonly instance: AxiosInstance = axios

  get axiosRef(): AxiosInstance {
    return this.instance
  }
  request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.request, config)
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.delete, url, config)
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.head, url, config)
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.post, url, data, config)
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.put, url, data, config)
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.get, url, config)
  }
  protected makeObservable<T>(axios: (...args: any[]) => AxiosPromise<T>, ...args: any[]) {
    return new Observable<AxiosResponse<T>>((subscriber) => {
      const config: AxiosRequestConfig = { ...(args[args.length - 1] || {}) }
      let cancelSource: CancelTokenSource
      if (!config.cancelToken) {
        cancelSource = Axios.CancelToken.source()
        config.cancelToken = cancelSource.token
      }
      axios(...args)
        .then((res) => {
          subscriber.next(res)
          subscriber.complete()
        })
        .catch((err) => {
          subscriber.error(err)
        })
      return () => {
        if (config.responseType === 'stream') {
          return
        }
        if (cancelSource) {
          cancelSource.cancel()
        }
      }
    })
  }
}
