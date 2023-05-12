import type {BaseRepositoryInterface} from "@/repositories/BaseRepositoryInterface";
import axios from "@/modules/api/axios"
import type {AxiosRequestConfig, AxiosResponse} from "axios";

export class BaseRepository<T> implements BaseRepositoryInterface<T> {
  protected url

  constructor(resource:string, prefix?:string, version?: string) {
    let url = "";
    if (prefix)
      url += prefix + "/"
    if (version)
      url += version + "/"
    if (resource)
      url += resource + "/"
    this.url = url
  }

  create(item: T): Promise<AxiosResponse<T>> {
    const cfg = {
      url: this.url,
      method: "POST",
      data: item
    }
    return axios.request<any, AxiosResponse<T>>(cfg);
  }

  update(id: number, item: T): Promise<AxiosResponse<T>> {
    const cfg = {
      url: this.url,
      method: "PUT",
      data: item
    }
    return axios.request<any, AxiosResponse<T>>(cfg);
  }

  delete(id: number): Promise<T> {
    const cfg: AxiosRequestConfig = {
      url: this.url + id,
      method: "DELETE",

    }
    return axios.request<any, T>(cfg);
  }

  get(id: number): Promise<AxiosResponse<T>> {
    const cfg: AxiosRequestConfig = {
      url: this.url + id,
      method: "GET"
    }
    return axios.request<any, AxiosResponse<T>>(cfg);
  }
}