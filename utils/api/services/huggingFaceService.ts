import { ApiService } from "../apiService";
import { AxiosRequestConfig } from "axios";

const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

export class HuggingFaceService extends ApiService {
  constructor(modelId: string) {
    super(`https://api-inference.huggingface.co/models/${modelId}`);
  }

  async get(
    params?: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    return super.get(params, {
      ...options,
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        ...options?.headers,
      },
    });
  }

  async post(
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    return super.post(data, {
      ...options,
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        ...options?.headers,
      },
    });
  }

  async delete(id: string, options?: AxiosRequestConfig): Promise<any[]> {
    return super.delete(id, {
      ...options,
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        ...options?.headers,
      },
    });
  }

  async put(
    id: string,
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<any[]> {
    return super.put(id, data, {
      ...options,
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        ...options?.headers,
      },
    });
  }
}
