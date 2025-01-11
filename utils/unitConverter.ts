export type UnitType =
  | "length"
  | "area"
  | "volume"
  | "weight"
  | "temperature"
  | "speed"
  | "time"
  | "digital";

export interface Unit {
  unit: string;
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const UnitData: Record<UnitType, Unit[]> = {
  length: [
    {
      unit: "mm",
      label: "Millimeter",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    {
      unit: "cm",
      label: "Centimeter",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    {
      unit: "m",
      label: "Meter",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "km",
      label: "Kilometer",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    {
      unit: "in",
      label: "Inch",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
    {
      unit: "ft",
      label: "Foot",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    {
      unit: "yd",
      label: "Yard",
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144,
    },
    {
      unit: "mi",
      label: "Mile",
      toBase: (v) => v * 1609.344,
      fromBase: (v) => v / 1609.344,
    },
  ],
  area: [
    {
      unit: "mm2",
      label: "Square Millimeter",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    {
      unit: "cm2",
      label: "Square Centimeter",
      toBase: (v) => v / 10000,
      fromBase: (v) => v * 10000,
    },
    {
      unit: "m2",
      label: "Square Meter",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "km2",
      label: "Square Kilometer",
      toBase: (v) => v * 1000000,
      fromBase: (v) => v / 1000000,
    },
    {
      unit: "ha",
      label: "Hectare",
      toBase: (v) => v * 10000,
      fromBase: (v) => v / 10000,
    },
    {
      unit: "acre",
      label: "Acre",
      toBase: (v) => v * 4046.86,
      fromBase: (v) => v / 4046.86,
    },
  ],
  volume: [
    {
      unit: "ml",
      label: "Milliliter",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    {
      unit: "l",
      label: "Liter",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "m3",
      label: "Cubic Meter",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    {
      unit: "gal",
      label: "Gallon (US)",
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541,
    },
  ],
  weight: [
    {
      unit: "mg",
      label: "Milligram",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    {
      unit: "g",
      label: "Gram",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    {
      unit: "kg",
      label: "Kilogram",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "t",
      label: "Metric Ton",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    {
      unit: "lb",
      label: "Pound",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    {
      unit: "oz",
      label: "Ounce",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
  ],
  temperature: [
    {
      unit: "c",
      label: "Celsius",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "f",
      label: "Fahrenheit",
      toBase: (v) => ((v - 32) * 5) / 9,
      fromBase: (v) => (v * 9) / 5 + 32,
    },
    {
      unit: "k",
      label: "Kelvin",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  ],
  speed: [
    {
      unit: "mps",
      label: "Meters per Second",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "kph",
      label: "Kilometers per Hour",
      toBase: (v) => v / 3.6,
      fromBase: (v) => v * 3.6,
    },
    {
      unit: "mph",
      label: "Miles per Hour",
      toBase: (v) => v * 0.44704,
      fromBase: (v) => v / 0.44704,
    },
    {
      unit: "knot",
      label: "Knot",
      toBase: (v) => v * 0.514444,
      fromBase: (v) => v / 0.514444,
    },
  ],
  time: [
    {
      unit: "ms",
      label: "Millisecond",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    {
      unit: "s",
      label: "Second",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "min",
      label: "Minute",
      toBase: (v) => v * 60,
      fromBase: (v) => v / 60,
    },
    {
      unit: "h",
      label: "Hour",
      toBase: (v) => v * 3600,
      fromBase: (v) => v / 3600,
    },
    {
      unit: "d",
      label: "Day",
      toBase: (v) => v * 86400,
      fromBase: (v) => v / 86400,
    },
  ],
  digital: [
    {
      unit: "b",
      label: "Byte",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      unit: "kb",
      label: "Kilobyte",
      toBase: (v) => v * 1024,
      fromBase: (v) => v / 1024,
    },
    {
      unit: "mb",
      label: "Megabyte",
      toBase: (v) => v * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024),
    },
    {
      unit: "gb",
      label: "Gigabyte",
      toBase: (v) => v * 1024 * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024 * 1024),
    },
    {
      unit: "tb",
      label: "Terabyte",
      toBase: (v) => v * 1024 * 1024 * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024 * 1024 * 1024),
    },
  ],
};

export function convertUnit(
  type: UnitType,
  fromUnit: string,
  toUnit: string,
  value: number
): number {
  const units = UnitData[type];
  const fromUnitData = units.find((u) => u.unit === fromUnit);
  const toUnitData = units.find((u) => u.unit === toUnit);

  if (!fromUnitData || !toUnitData) return 0;

  const baseValue = fromUnitData.toBase(value);
  return toUnitData.fromBase(baseValue);
}
