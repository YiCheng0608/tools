"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface RouletteItem {
  name: string;
  probability: number;
  color: string;
}

interface RouletteProps {
  texts: {
    buttons: {
      spin: string;
      reset: string;
      add: string;
      remove: string;
      clear: string;
    };
    placeholders: {
      item: string;
      probability: string;
      empty: string;
    };
    messages: {
      winner: string;
      minimum: string;
      maximum: string;
      invalidProbability: string;
      totalProbability: string;
      probabilityRequired: string;
    };
  };
}

interface ResultPopupProps {
  winner: string;
  onClose: () => void;
  texts: {
    messages: {
      winner: string;
    };
  };
}

function ResultPopup({ winner, onClose, texts }: ResultPopupProps) {
  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full"
      >
        <p className="text-lg font-medium text-gray-900 mb-2">
          {texts.messages.winner}
        </p>
        <p className="text-2xl font-bold text-blue-600 mb-6">{winner}</p>
        <button
          onClick={handleClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          OK
        </button>
      </motion.div>
    </div>,
    document.body
  );
}

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E67E22",
  "#1ABC9C",
  "#F1C40F",
  "#2ECC71",
  "#FF9F43",
  "#00B894",
  "#74B9FF",
  "#6C5CE7",
  "#FDA7DF",
  "#A8E6CF",
  "#DCEDC1",
  "#FFD93D",
  "#95E1D3",
  "#726A95",
  "#F38181",
  "#FCE38A",
];

const getNextColor = (usedColors: string[]): string => {
  const availableColors = COLORS.filter((color) => !usedColors.includes(color));

  if (availableColors.length === 0) {
    return COLORS[usedColors.length % COLORS.length];
  }

  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

export default function Roulette({ texts }: RouletteProps) {
  const [items, setItems] = useState<RouletteItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [probability, setProbability] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const calculateTotalProbability = () => {
    return items.reduce((sum, item) => sum + item.probability, 0);
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    if (items.some((item) => item.name === newItem.trim())) {
      setError("此項目名稱已存在");
      return;
    }

    const prob = parseFloat(probability);
    if (isNaN(prob) || prob <= 0 || prob > 100) {
      setError(texts.messages.invalidProbability);
      return;
    }

    const totalProb = calculateTotalProbability();
    if (totalProb + prob > 100) {
      setError(texts.messages.totalProbability);
      return;
    }

    const usedColors = items.map((item) => item.color);
    const newColor = getNextColor(usedColors);

    const newRouletteItem: RouletteItem = {
      name: newItem.trim(),
      probability: prob,
      color: newColor,
    };

    setItems([...items, newRouletteItem]);
    setNewItem("");
    setProbability("");
    setError(null);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setError(null);
  };

  const selectWinner = () => {
    const random = Math.random() * 100;
    let accumulator = 0;

    for (const item of items) {
      accumulator += item.probability;
      if (random <= accumulator) {
        return item;
      }
    }

    return items[items.length - 1];
  };

  const resetWheel = () => {
    setRotation(0);
  };

  const handleSpin = () => {
    if (items.length < 2) {
      setError(texts.messages.minimum);
      return;
    }

    const totalProb = calculateTotalProbability();
    if (totalProb !== 100) {
      setError(
        texts.messages.probabilityRequired.replace(
          "{total}",
          totalProb.toString()
        )
      );
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    setError(null);

    const winner = selectWinner();
    const resultIndex = items.findIndex((item) => item.name === winner.name);

    const startAngle = items
      .slice(0, resultIndex)
      .reduce((sum, item) => sum + (item.probability / 100) * 360, 0);

    const randomPosition = Math.random();
    const resultAngle =
      startAngle +
      (items[resultIndex].probability / 100) * 360 * randomPosition;

    const extraSpins = 5;
    const baseRotation = rotation % 360;
    const targetAngle = 360 - (resultAngle + baseRotation);
    const totalRotation = 360 * extraSpins + targetAngle;

    setRotation(rotation + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(winner.name);
    }, 4000);
  };

  const handleReset = () => {
    setItems([]);
    setWinner(null);
    setRotation(0);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <div
            id="roulette-container"
            className="relative w-[300px] h-[300px] my-8"
          >
            <div
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-[#f50057] z-10"
              style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
            />

            <motion.div
              ref={wheelRef}
              className="w-[300px] h-[300px] rounded-full overflow-hidden border-[10px] border-[#2196f3]"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
              }}
            >
              <div id="roulette-items" className="w-full h-full relative">
                {items.map((item, index) => {
                  const startAngle = items
                    .slice(0, index)
                    .reduce((sum, i) => sum + (i.probability / 100) * 360, 0);
                  const angle = (item.probability / 100) * 360;

                  return (
                    <div
                      key={index}
                      className="roulette-item absolute w-full h-full"
                      style={
                        {
                          transform: `rotate(${startAngle}deg)`,
                          "--start-angle": `${0}deg`,
                          "--end-angle": `${angle}deg`,
                          "--segment-color": item.color,
                        } as any
                      }
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 space-x-4">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {texts.buttons.spin}
            </button>
            <button
              onClick={handleReset}
              disabled={isSpinning}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
            >
              {texts.buttons.reset}
            </button>
          </div>

          <AnimatePresence>
            {winner && (
              <ResultPopup
                winner={winner}
                onClose={() => {
                  setWinner(null);
                  resetWheel();
                }}
                texts={texts}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={texts.placeholders.item}
                className="px-4 py-2 border rounded-lg"
                maxLength={20}
              />
              <input
                type="number"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                placeholder={texts.placeholders.probability}
                className="px-4 py-2 border rounded-lg"
                min="0"
                max="100"
                step="0.1"
              />
              <button
                onClick={handleAddItem}
                disabled={isSpinning}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
              >
                {texts.buttons.add}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center">
                  {texts.placeholders.empty}
                </p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="truncate mr-2">
                      {index + 1}. {item.name} ({item.probability}%)
                    </span>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      disabled={isSpinning}
                      className="text-white hover:text-gray-200 shrink-0"
                    >
                      {texts.buttons.remove}
                    </button>
                  </div>
                ))
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
