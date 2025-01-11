interface IconProps {
  className?: string;
}

export function CalculatorIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="10" y2="12" />
      <line x1="11" y1="12" x2="13" y2="12" />
      <line x1="14" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="10" y2="16" />
      <line x1="11" y1="16" x2="13" y2="16" />
      <line x1="14" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export function FunctionIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12C4 12 8 4 12 4C16 4 20 12 20 12C20 12 16 20 12 20C8 20 4 12 4 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ConvertIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12h16" />
      <path d="M4 6h16" />
      <path d="M4 18h16" />
      <circle cx="8" cy="6" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
    </svg>
  );
}

export function ColorPaletteIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4 L12 2" />
      <path d="M12 22 L12 20" />
      <path d="M4 12 L2 12" />
      <path d="M22 12 L20 12" />
      <path d="M6 6 L4.5 4.5" />
      <path d="M18 18 L19.5 19.5" />
      <path d="M18 6 L19.5 4.5" />
      <path d="M6 18 L4.5 19.5" />
    </svg>
  );
}

export function QRCodeIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M6 6h1v1H6z" fill="currentColor" />
      <path d="M17 6h1v1h-1z" fill="currentColor" />
      <path d="M6 17h1v1H6z" fill="currentColor" />
      <path d="M17 17h1v1h-1z" fill="currentColor" />
    </svg>
  );
}

export function RulerIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12h20" />
      <path d="M6 8v8" />
      <path d="M10 8v8" />
      <path d="M14 8v8" />
      <path d="M18 8v8" />
      <path d="M8 10v4" />
      <path d="M12 10v4" />
      <path d="M16 10v4" />
    </svg>
  );
}

export function ImageIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export function ColorConverterIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2l3 3H9l3-3z" />
      <path d="M12 22l-3-3h6l-3 3z" />
      <path d="M2 12l3-3v6l-3-3z" />
      <path d="M22 12l-3 3v-6l3 3z" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v8" strokeDasharray="2 2" />
      <path d="M8 12h8" strokeDasharray="2 2" />
    </svg>
  );
}

export function UnitConverterIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M9 6l3-3 3 3" />
      <path d="M9 18l3 3 3-3" />
      <path d="M12 3v18" strokeDasharray="4 4" />
      <path d="M6 12h12" />
    </svg>
  );
}

export function ImageConverterIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
      <circle cx="6" cy="6" r="1" />
      <circle cx="18" cy="18" r="1" />
      <path d="M11 3h10" />
      <path d="M3 13h10" />
      <path d="M7 11l-4 2" />
      <path d="M17 11l4-2" />
      <path d="M11 7l2 4" />
      <path d="M11 17l2-4" />
    </svg>
  );
}

// ... 其他圖標
