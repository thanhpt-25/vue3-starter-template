import Axios from 'axios'
import type {AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import config from '@/modules/api/config'
import {HttpStatus} from "@/utils/enums/http-status.enum";
import {
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException
} from "@/exceptions/http";
import i18n from "@/modules/i18n";

const TOKEN_KEY = 'access_token'

const axios: AxiosInstance = Axios.create(config)

function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem(TOKEN_KEY)
  config.headers.Accept = 'application/json'
  if (!config.headers.Authorization && token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
interface CustomAxiosError extends AxiosError {
  handled: boolean
  errors: any
  status: number
}
function requestInterceptorError(error: CustomAxiosError) {
  return Promise.reject(error)
}
axios.interceptors.request.use(requestInterceptor, requestInterceptorError)

function responseSuccessInterceptor(response: AxiosResponse): AxiosResponse {
  return response
}
async function responseErrorInterceptor(error: AxiosError): Promise<HttpException> {
  // Happens for cancelled requests using axios CancelTokenSource
  if (!error.response) {
    return Promise.reject(error)
  }
  const {status} = error.response
  if (status in HttpStatus) {
    if (status === HttpStatus.UNAUTHORIZED) {
      const reason = new UnauthorizedException(i18n.global.t(`http.message.${status}`),{cause:error})
      return Promise.reject(reason);
    }else if (status === HttpStatus.FORBIDDEN){
      return Promise.reject(new ForbiddenException("You are not allowed to perform this action"));
    }else if (status === HttpStatus.INTERNAL_SERVER_ERROR){
      return Promise.reject(new InternalServerErrorException(error.response));
    }
  }
  /**
   * Not in our handlable exception list
   */
  const reason = new HttpException(error.message, error.status || -1 )
  return Promise.reject(reason)
}

axios.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor)
export default axios
