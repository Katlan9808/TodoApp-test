import axios, { AxiosRequestConfig } from 'axios'
import promise from 'promise'
import { RequestResultModel } from '../../domain/models/RequestResultModel'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_HOST //API_URL,
})

export type RequestProps = {
  get?: GetRequest
  post?: PostRequest
  put?: PutRequest
  patch?: any
  delete?: any
  config?: AxiosRequestConfig
}

type PutRequest = {
  path: string
  body: any
}

type PostRequest = {
  path: string
  body: any
  headers?: Record<string, string>
}

type GetRequest = {
  path: string
  query?: any
}

export function makeResponse<T>(response: any): RequestResultModel<T> {
  let result: RequestResultModel<T>
  if (response.data != null && typeof response.data !== 'undefined') {
    result = {
      result: response.data === '' ? null : response.data,
    }
  } else {
    result = {
      result: response.data === '' ? null : response
    }
  }
  result.status = response.status;
  return result
}

export function makeErrorResponse<T>(error: any): RequestResultModel<T> {
  if (error?.response?.data instanceof ArrayBuffer) {
    let blob = new Blob([error.response.data])
    return {
      status: error.response.status ?? 500,
      errorMessage: error.response.statusText ?? '',
    }
  }
  return {
    status: error.response.status ?? 500,
    errorMessage: error.response.statusText ?? '',
  }
}



export const sendRequest = async <T>(props: RequestProps): Promise<RequestResultModel<T>> => {
  let response = null
  try {
    if (props.get) {
      response = await axiosInstance.get(props.get.path, props.config)
    }
    if (props.post) {
      response = await axiosInstance.post(props.post.path, props.post.body, props.config)
    }
    if (props.put) {
      response = await axiosInstance.put(props.put.path, props.put.body, props.config)
    }
    if (props.delete) {
      response = await axiosInstance.delete(props.delete.path, props.config)
    }
  } catch (e) {
    throw makeErrorResponse<T>(e)
  }
  return makeResponse<T>(response)
}