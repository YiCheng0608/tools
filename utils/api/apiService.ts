import { AxiosRequestConfig } from "axios";
import apiClient from "./client";

export class ApiService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // GET
  async get(
    params?: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    try {
      const response = await apiClient.get<any[]>(this.endpoint, {
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
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    try {
      const response = await apiClient.post<any[]>(
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
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    try {
      const response = await apiClient.put<any[]>(
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
  ): Promise<any[]> {
    try {
      const response = await apiClient.delete<any[]>(
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
