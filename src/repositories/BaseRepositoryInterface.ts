import type {AxiosResponse} from "axios";
export interface BaseRepositoryInterface<T> {
  create(item: T): Promise<AxiosResponse<T>>;
  update(id: number, item: T): Promise<AxiosResponse<T>>;
  delete(id: number): Promise<T>;
  get(id: number): Promise<AxiosResponse<T>>;
}
