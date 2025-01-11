"use client";

import { useState } from "react";

interface ColorConverterProps {
  label: string;
}

export default function ColorConverter({ label }: ColorConverterProps) {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbValue = hexToRgb(value);
    if (rgbValue) {
      setRgb(rgbValue);
    }
  };

  const handleRgbChange = (color: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [color]: value };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div
          className="w-full h-24 rounded-lg mb-4"
          style={{ backgroundColor: hex }}
        />
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">RGB</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => handleRgbChange("r", +e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="R"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => handleRgbChange("g", +e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="G"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => handleRgbChange("b", +e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="B"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
