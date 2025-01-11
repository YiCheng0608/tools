"use client";

import { useEffect } from "react";

export default function AdsenseScript() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Adsbygoogle error:", err);
    }
  }, []);

  return null;
}
