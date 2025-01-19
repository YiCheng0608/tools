import axios from "axios";

const apiClient = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 攔截器
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 攔截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 這裡可以統一處理錯誤
    if (error.response) {
      // 伺服器回應錯誤
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // 請求發送失敗
      console.error("Request Error:", error.request);
    } else {
      // 其他錯誤
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
