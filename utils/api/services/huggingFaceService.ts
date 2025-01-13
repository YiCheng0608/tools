import { ApiResponse, ApiService } from "../apiService";
import { AxiosRequestConfig } from "axios";

const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

export class HuggingFaceService extends ApiService<any> {
  constructor(modelId: string) {
    super(`/https://api-inference.huggingface.co/models/${modelId}`);
  }

  async get(
    params?: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<any>> {
    return super.get(params, {
      headers: { Authorization: `Bearer ${huggingFaceApiKey}` },
      ...options,
    });
  }

  async post(
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<any>> {
    return super.post(data, {
      headers: { Authorization: `Bearer ${huggingFaceApiKey}` },
      ...options,
    });
  }

  async delete(
    id: string,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<any>> {
    return super.delete(id, {
      headers: { Authorization: `Bearer ${huggingFaceApiKey}` },
      ...options,
    });
  }

  async put(
    id: string,
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<any>> {
    return super.put(id, data, {
      headers: { Authorization: `Bearer ${huggingFaceApiKey}` },
      ...options,
    });
  }
}
