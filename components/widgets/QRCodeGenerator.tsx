"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeGeneratorProps {
  label: string;
}

export default function QRCodeGenerator({ label }: QRCodeGeneratorProps) {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(256);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{size}px</div>
          </div>
          <div className="flex justify-center mt-4">
            {url && (
              <div className="p-4 bg-white rounded-lg">
                <QRCodeSVG
                  value={url}
                  size={size}
                  level="H"
                  includeMargin={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
