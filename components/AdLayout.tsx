import React from "react";

interface AdLayoutProps {
  children: React.ReactNode;
}

export default function AdLayout({ children }: AdLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left Ad */}
        <div className="hidden lg:block w-64 p-4">
          <div className="bg-gray-100 h-full flex items-center justify-center">
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
              data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
              data-ad-format="vertical"
            ></ins>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>

        {/* Right Ad */}
        <div className="hidden lg:block w-64 p-4">
          <div className="bg-gray-100 h-full flex items-center justify-center">
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
              data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
              data-ad-format="vertical"
            ></ins>
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="h-24 p-4">
        <div className="bg-gray-100 h-full flex items-center justify-center">
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
            data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM}
            data-ad-format="horizontal"
          ></ins>
        </div>
      </div>
    </div>
  );
}
