"use client";

import { useState } from "react";
import { ArticleService } from "@/utils/api/services/articleService";

interface ArticleGeneratorProps {
  formats: {
    title: string;
    placeholder: string;
    generate: string;
    generating: string;
    copy: string;
    copied: string;
    wordCount: string;
  };
  lang: string;
}

export default function ArticleGenerator({
  formats,
  lang,
}: ArticleGeneratorProps) {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const articleService = new ArticleService();

  const handleGenerate = async () => {
    if (!title.trim()) return;

    setIsGenerating(true);
    try {
      const generatedArticle = await articleService.generateArticle(
        title,
        lang
      );
      setArticle(
        articleService.removePrompt(generatedArticle[0].generated_text)
      );
    } catch (error) {
      console.error("Failed to generate article:", error);
      // TODO: 處理錯誤
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(article);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={formats.placeholder}
          className="w-full p-3 border rounded-lg"
          disabled={isGenerating}
        />
        <p className="mt-2 text-sm text-gray-500">{formats.wordCount}</p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!title.trim() || isGenerating}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isGenerating ? formats.generating : formats.generate}
      </button>

      {article && (
        <div className="relative p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-wrap">{article}</p>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <span className="material-icons">
              {isCopied ? "check" : "content_copy"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
