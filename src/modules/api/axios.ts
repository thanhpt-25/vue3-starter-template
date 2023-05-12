import Axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_URL } from '@/modules/api/config'
import { isForbidden, isInternalServerError, isUnauthorized, mapErrors } from '@/modules/api/codes'

export const statusCodesToHandle = [400, 401, 422]
const TOKEN_KEY = 'token'

const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function requestInterceptor(config:  InternalAxiosRequestConfig):  InternalAxiosRequestConfig {
  const token = localStorage.getItem(TOKEN_KEY)
  /*
  if (!config.headers) {
    config.headers = {};
  }
  */
  config.headers.Accept = 'application/json'

  if (!config.headers.Authorization && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
function requestInterceptorError(error: CustomAxiosError){
  return Promise.reject(error)
}

axios.interceptors.request.use(requestInterceptor, requestInterceptorError)

function responseSuccessInterceptor(response: AxiosResponse): AxiosResponse {
  return response.data
}

interface CustomAxiosError extends AxiosError {
  handled: boolean
  errors: any
  status: number
}

async function responseErrorInterceptor(error: CustomAxiosError) {
  // Happens for cancelled requests using axios CancelTokenSource
  if (!error.response) {
    return Promise.reject(error)
  }

  const { status } = error.response
  let errors = ''

  if (statusCodesToHandle.includes(status)) {
    errors = mapErrors(error.response.data)
    if (errors === 'Unauthenticated.') {
      errors = 'Your session expired. Please login in again to use the application'
    }
  }

  if (isForbidden(status)) {
    errors = 'You are not allowed to perform this action'
  }

  if (isInternalServerError(status)) {
    errors = 'A server error occurred during request execution'
  }
  error.errors = errors
  error.status = status

  if (isUnauthorized(status)) {
    // TODO: Logout here if necessary
    return Promise.reject(error)
  }
  return Promise.reject(error)
}
axios.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor)
export default axios;