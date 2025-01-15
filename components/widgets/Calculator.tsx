"use client";

import { useState } from "react";

interface CalculatorProps {
  buttons: {
    clear: string;
    clearAll: string;
    backspace: string;
    square: string;
    cube: string;
    power: string;
    sqrt: string;
    log: string;
    ln: string;
    sin: string;
    cos: string;
    tan: string;
    pi: string;
    e: string;
    factorial: string;
    inverse: string;
    memory: {
      save: string;
      recall: string;
      clear: string;
      add: string;
      subtract: string;
    };
  };
}

export default function Calculator({ buttons }: CalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const calculate = (a: number, op: string, b: number): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : NaN;
      case "^":
        return Math.pow(a, b);
      default:
        return b;
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: string) => {
    const value = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(value);
    } else if (operation) {
      const result = calculate(previousValue, operation, value);
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setOperation(op);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    const value = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, operation, value);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "square":
        result = value * value;
        break;
      case "cube":
        result = value * value * value;
        break;
      case "sin":
        result = Math.sin(value);
        break;
      case "cos":
        result = Math.cos(value);
        break;
      case "tan":
        result = Math.tan(value);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "factorial":
        result = factorial(value);
        break;
      case "inverse":
        result = 1 / value;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const handleConstant = (constant: string) => {
    switch (constant) {
      case "pi":
        setDisplay(String(Math.PI));
        break;
      case "e":
        setDisplay(String(Math.E));
        break;
    }
    setWaitingForOperand(true);
  };

  const handleMemory = (action: string) => {
    const value = parseFloat(display);

    switch (action) {
      case "save":
        setMemory(value);
        break;
      case "recall":
        setDisplay(String(memory));
        break;
      case "clear":
        setMemory(0);
        break;
      case "add":
        setMemory(memory + value);
        break;
      case "subtract":
        setMemory(memory - value);
        break;
    }
    setWaitingForOperand(true);
  };

  const clear = () => {
    setDisplay("0");
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="text-right text-2xl font-mono">{display}</div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Memory Buttons */}
        <button onClick={() => handleMemory("clear")} className="btn-memory">
          {buttons.memory.clear}
        </button>
        <button onClick={() => handleMemory("recall")} className="btn-memory">
          {buttons.memory.recall}
        </button>
        <button onClick={() => handleMemory("save")} className="btn-memory">
          {buttons.memory.save}
        </button>
        <button onClick={() => handleMemory("add")} className="btn-memory">
          {buttons.memory.add}
        </button>
        <button onClick={() => handleMemory("subtract")} className="btn-memory">
          {buttons.memory.subtract}
        </button>

        {/* Function Buttons */}
        <button onClick={() => handleFunction("sin")} className="btn-function">
          {buttons.sin}
        </button>
        <button onClick={() => handleFunction("cos")} className="btn-function">
          {buttons.cos}
        </button>
        <button onClick={() => handleFunction("tan")} className="btn-function">
          {buttons.tan}
        </button>
        <button onClick={() => handleConstant("pi")} className="btn-constant">
          {buttons.pi}
        </button>
        <button onClick={() => handleConstant("e")} className="btn-constant">
          {buttons.e}
        </button>

        <button onClick={() => handleFunction("log")} className="btn-function">
          {buttons.log}
        </button>
        <button onClick={() => handleFunction("ln")} className="btn-function">
          {buttons.ln}
        </button>
        <button onClick={() => handleFunction("sqrt")} className="btn-function">
          {buttons.sqrt}
        </button>
        <button
          onClick={() => handleFunction("square")}
          className="btn-function"
        >
          {buttons.square}
        </button>
        <button onClick={() => handleFunction("cube")} className="btn-function">
          {buttons.cube}
        </button>

        {/* Numbers and Basic Operations */}
        <button onClick={() => handleNumber("7")} className="btn-number">
          7
        </button>
        <button onClick={() => handleNumber("8")} className="btn-number">
          8
        </button>
        <button onClick={() => handleNumber("9")} className="btn-number">
          9
        </button>
        <button onClick={() => handleOperator("/")} className="btn-operator">
          /
        </button>
        <button onClick={backspace} className="btn-control">
          {buttons.backspace}
        </button>

        <button onClick={() => handleNumber("4")} className="btn-number">
          4
        </button>
        <button onClick={() => handleNumber("5")} className="btn-number">
          5
        </button>
        <button onClick={() => handleNumber("6")} className="btn-number">
          6
        </button>
        <button onClick={() => handleOperator("*")} className="btn-operator">
          ×
        </button>
        <button onClick={clear} className="btn-control">
          {buttons.clear}
        </button>

        <button onClick={() => handleNumber("1")} className="btn-number">
          1
        </button>
        <button onClick={() => handleNumber("2")} className="btn-number">
          2
        </button>
        <button onClick={() => handleNumber("3")} className="btn-number">
          3
        </button>
        <button onClick={() => handleOperator("-")} className="btn-operator">
          -
        </button>
        <button onClick={clearAll} className="btn-control">
          {buttons.clearAll}
        </button>

        <button onClick={() => handleNumber("0")} className="btn-number">
          0
        </button>
        <button onClick={handleDecimal} className="btn-number">
          .
        </button>
        <button
          onClick={() => handleFunction("factorial")}
          className="btn-function"
        >
          {buttons.factorial}
        </button>
        <button onClick={() => handleOperator("+")} className="btn-operator">
          +
        </button>
        <button onClick={handleEquals} className="btn-equals">
          =
        </button>
      </div>

      <style jsx>{`
        .btn-number,
        .btn-operator,
        .btn-function,
        .btn-control,
        .btn-memory,
        .btn-constant,
        .btn-equals {
          @apply p-3 rounded text-center transition-colors;
        }
        .btn-number {
          @apply bg-gray-100 hover:bg-gray-200 text-gray-800;
        }
        .btn-operator {
          @apply bg-blue-500 hover:bg-blue-600 text-white;
        }
        .btn-function {
          @apply bg-indigo-500 hover:bg-indigo-600 text-white;
        }
        .btn-control {
          @apply bg-red-500 hover:bg-red-600 text-white;
        }
        .btn-memory {
          @apply bg-purple-500 hover:bg-purple-600 text-white;
        }
        .btn-constant {
          @apply bg-green-500 hover:bg-green-600 text-white;
        }
        .btn-equals {
          @apply bg-blue-600 hover:bg-blue-700 text-white;
        }
      `}</style>
    </div>
  );
}
