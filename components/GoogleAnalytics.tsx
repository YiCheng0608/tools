"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [isConsented, setIsConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      const { analytics } = JSON.parse(consent);
      setIsConsented(analytics);
    }
  }, []);

  if (!isConsented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
