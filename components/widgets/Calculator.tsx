"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg p-4">
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="text-sm text-gray-600">{equation}</div>
        <div className="text-2xl">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") calculate();
              else if (["+", "-", "*", "/"].includes(btn)) handleOperator(btn);
              else handleNumber(btn);
            }}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={clear}
          className="col-span-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
