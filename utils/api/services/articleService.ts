import { HuggingFaceService } from "./huggingFaceService";

export class ArticleService extends HuggingFaceService {
  constructor() {
    super("google/gemma-2-2b-it");
  }

  async generateArticle(
    title: string,
    language: string
  ): Promise<{ generated_text: string }[]> {
    const prompt = `請根據 "${title}"生成一篇大約 300 字的文章，文章中只包含核心內容，避免重複與冗長的敘述，並使用${language}語言生成文章。`;

    const headers = {
      "Content-Type": "application/json",
      "x-use-cache": "false",
      // 需要等待模型加載
      "x-wait-for-model": "true",
    };

    try {
      const response = await this.post(
        {
          inputs: prompt,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            top_p: 0.9,
          },
        },
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      console.error("Error generating article:", error);
      throw error;
    }
  }

  // 因為目前的文章模型，產出的答案都會有包含prompt，所以需要將prompt去除並且幫我把Title:後面的文字去除
  removePrompt(text: string): string {
    return text.replace(/^.*\n/, "").replace(/^Title:.*\n/, "");
  }
}
