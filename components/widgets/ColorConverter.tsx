"use client";

import { useState } from "react";

interface ColorConverterProps {
  formats: {
    hex: string;
    rgb: string;
  };
}

export default function ColorConverter({ formats }: ColorConverterProps) {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  // HEX to RGB 轉換
  const hexToRgb = (hex: string) => {
    // 移除 # 符號並轉換為小寫
    hex = hex.replace("#", "").toLowerCase();

    // 處理 3 位數的簡寫形式 (#RGB)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    // 處理 6 位數的完整形式 (#RRGGBB)
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return null;
  };

  // RGB to HEX 轉換
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // 處理 HEX 輸入
  const handleHexChange = (value: string) => {
    // 允許輸入過程中的不完整值
    setHex(value);

    // 檢查是否為有效的 HEX 值（3位數或6位數）
    const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6})$/i;
    if (hexRegex.test(value)) {
      const normalizedHex = value.startsWith("#") ? value : `#${value}`;
      const rgbValue = hexToRgb(normalizedHex);
      if (rgbValue) {
        setRgb(rgbValue);
      }
    }
  };

  // 處理 RGB 輸入
  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    const numValue = value === "" ? 0 : parseInt(value);
    if (!isNaN(numValue)) {
      // 限制值在 0-255 範圍內
      const limitedValue = Math.max(0, Math.min(255, numValue));
      const newRgb = { ...rgb, [channel]: limitedValue };
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  return (
    <div className="space-y-6">
      {/* HEX 輸入 */}
      <div>
        <label className="block text-sm font-medium mb-1">{formats.hex}</label>
        <input
          type="text"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="#000000"
          maxLength={7}
        />
      </div>

      {/* RGB 輸入 */}
      <div>
        <label className="block text-sm font-medium mb-1">{formats.rgb}</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={rgb.r}
            onChange={(e) => handleRgbChange("r", e.target.value)}
            min="0"
            max="255"
            className="p-2 border rounded"
            placeholder="R"
          />
          <input
            type="number"
            value={rgb.g}
            onChange={(e) => handleRgbChange("g", e.target.value)}
            min="0"
            max="255"
            className="p-2 border rounded"
            placeholder="G"
          />
          <input
            type="number"
            value={rgb.b}
            onChange={(e) => handleRgbChange("b", e.target.value)}
            min="0"
            max="255"
            className="p-2 border rounded"
            placeholder="B"
          />
        </div>
      </div>

      {/* 顏色預覽 */}
      <div
        className="w-full h-24 rounded border"
        style={{
          backgroundColor: hex.match(/^#([a-f\d]{3}|[a-f\d]{6})$/i)
            ? hex
            : "#000000",
        }}
      />
    </div>
  );
}
