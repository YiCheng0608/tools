"use client";

import { useState } from "react";
import { UnitType, UnitData, convertUnit } from "@/utils/unitConverter";

interface UnitConverterProps {
  label: string;
  units: {
    length: string;
    area: string;
    volume: string;
    weight: string;
    temperature: string;
    speed: string;
    time: string;
    digital: string;
    from: string;
    to: string;
    value: string;
    result: string;
    labels: Record<string, string>;
  };
}

export default function UnitConverter({ label, units }: UnitConverterProps) {
  const [selectedType, setSelectedType] = useState<UnitType | "">("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [output, setOutput] = useState("");

  const handleTypeChange = (type: UnitType) => {
    setSelectedType(type);
    setFromUnit("");
    setToUnit("");
    setValue("");
    setResult("");
    setOutput("");
  };

  const handleConvert = () => {
    if (!selectedType || !fromUnit || !toUnit || !value) {
      setOutput("");
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setOutput("");
      return;
    }

    const convertedValue = convertUnit(
      selectedType,
      fromUnit,
      toUnit,
      numValue
    );
    setResult(convertedValue.toFixed(6));

    // 設置輸出格式
    setOutput(
      `${numValue} ${units.labels[fromUnit]} = ${convertedValue.toFixed(6)} ${
        units.labels[toUnit]
      }`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {/* Unit Type Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(units).map(
            ([key, label]) =>
              key !== "from" &&
              key !== "to" &&
              key !== "value" &&
              key !== "result" && (
                <button
                  key={key}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    selectedType === key
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                  ${key === "labels" && "hidden"}
                  `}
                  onClick={() => handleTypeChange(key as UnitType)}
                >
                  {typeof label === "string" && label}
                </button>
              )
          )}
        </div>

        {selectedType && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* From Unit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {units.from}
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    setResult("");
                    setOutput("");
                  }}
                >
                  <option value="" disabled>
                    {units.from}
                  </option>
                  {UnitData[selectedType].map((unit) => (
                    <option key={unit.unit} value={unit.unit}>
                      {units.labels[unit.unit] || unit.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Unit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {units.to}
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value);
                    setResult("");
                    setOutput("");
                  }}
                >
                  <option value="" disabled>
                    {units.to}
                  </option>
                  {UnitData[selectedType].map((unit) => (
                    <option key={unit.unit} value={unit.unit}>
                      {units.labels[unit.unit] || unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Value Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {units.value}
              </label>
              <input
                type="number"
                min={selectedType === "temperature" ? undefined : "0"}
                step="any"
                className="w-full p-2 border rounded"
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    selectedType !== "temperature" &&
                    parseFloat(newValue) < 0
                  ) {
                    return;
                  }
                  setValue(newValue);
                  setResult("");
                  setOutput("");
                }}
                placeholder="0"
              />
            </div>

            {/* Convert Button */}
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              onClick={handleConvert}
              disabled={!fromUnit || !toUnit || !value}
            >
              Convert
            </button>

            {/* Result */}
            {output && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">
                  {units.result}
                </div>
                <div className="text-lg font-bold text-gray-900 break-all">
                  {output}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
