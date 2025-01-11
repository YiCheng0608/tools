"use client";

import { useEffect } from "react";

export default function AdsenseScript() {
  useEffect(() => {
    // 檢查 adsbygoogle 是否存在並初始化廣告
    if (
      (window as any).adsbygoogle &&
      Array.isArray((window as any).adsbygoogle)
    ) {
      (window as any).adsbygoogle.push({});
    }
  }, []);

  return null;
}
