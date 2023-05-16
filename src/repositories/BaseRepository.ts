import type {BaseRepositoryInterface} from "@/repositories/BaseRepositoryInterface";
import axios from "@/modules/api/axios"
import Axios from 'axios'

import type {AxiosRequestConfig, AxiosResponse, AxiosPromise, CancelTokenSource, AxiosInstance} from "axios";
import { Observable } from 'rxjs';
export class BaseRepository implements BaseRepositoryInterface{
  protected url
  protected readonly instance: AxiosInstance = axios
  constructor(url:string) {
    this.url = url
  }
  get axiosRef(): AxiosInstance {
    return this.instance;
  }
  /*
   async post(data: any): Promise<T> {
      const cfg = {
        url: this.url,
        method: "POST",
        data: data,
      }
      const response = await axios.request<any, AxiosResponse<T>>(cfg);
      return response as T
    }

    async put(id: number, data: any): Promise<T> {
      const cfg = {
        url: this.url,
        method: "PUT",
        data: data
      }
      const response = await axios.request<any, AxiosResponse<T>>(cfg);
      return response as T
    }

    async delete(id: number): Promise<T> {
      const cfg: AxiosRequestConfig = {
        url: this.url + id,
        method: "DELETE",

      }
      const response = axios.request<any, AxiosResponse<T>>(cfg);
      return response as T
    }
    async get(id: number): Promise<T> {
      const cfg: AxiosRequestConfig = {
        url: this.url + id,
        method: "GET",
      }
      const response = await axios.request<any, AxiosResponse<T>>(cfg);
      return response as T
    }
  */

  request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.request, config);
  }
  delete<T = any>(
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.delete,this.url, config);
  }

  head<T = any>(
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.head, this.url, config);
  }

  post<T = any>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.post, this.url, data, config);
  }

  put<T = any>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.put, this.url, data, config);
  }

  get<T = any>(
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.makeObservable<T>(this.instance.get, this.url, config);
  }
  protected makeObservable<T>(
    axios: (...args: any[]) => AxiosPromise<T>,
    ...args: any[]
  ) {
    return new Observable<AxiosResponse<T>>(subscriber => {
      const config: AxiosRequestConfig = {...(args[args.length - 1] || {})};

      let cancelSource: CancelTokenSource;
      if (!config.cancelToken) {
        cancelSource = Axios.CancelToken.source();
        config.cancelToken = cancelSource.token;
      }

      axios(...args)
        .then(res => {
          console.log(res);
          subscriber.next(res);
          subscriber.complete();
        })
        .catch(err => {
          subscriber.error(err);
        });
      return () => {
        if (config.responseType === 'stream') {
          return;
        }
        if (cancelSource) {
          cancelSource.cancel();
        }
      };
    });
  }
}