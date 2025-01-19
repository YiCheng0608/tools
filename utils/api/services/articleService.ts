import { ApiService } from "../apiService";

interface ArticleResponse {
  content: string;
}

class ArticleService extends ApiService<ArticleResponse> {
  constructor() {
    super("/api/article");
  }

  async generateArticle(title: string): Promise<string> {
    try {
      const response = await this.post({ title });
      return response.data.content;
    } catch (error) {
      throw new Error("Failed to generate article");
    }
  }
}

export const articleService = new ArticleService();
