import { AxiosRequestConfig } from "axios";
import apiClient from "./client";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // GET
  async get(
    params?: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T[]>> {
    try {
      const response = await apiClient.get<ApiResponse<T[]>>(this.endpoint, {
        params,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST
  async post(
    data: Partial<T>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(
        this.endpoint,
        data,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT
  async put(
    id: string | number,
    data: Partial<T>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(
        `${this.endpoint}/${id}`,
        data,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE
  async delete(
    id: string | number,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(
        `${this.endpoint}/${id}`,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 錯誤處理
  private handleError(error: any): Error {
    if (error.response) {
      // 伺服器回應的錯誤
      const message = error.response.data?.message || "Server Error";
      return new Error(message);
    }
    return error;
  }
}
