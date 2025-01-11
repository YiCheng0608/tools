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
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="16" y2="18" />
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
      <path d="M20 4L12 12M12 12L4 4M12 12V20" />
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
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <path d="M13 13h7v2h-7z" />
      <path d="M13 17h7v2h-7z" />
      <path d="M14 13v7" />
      <path d="M18 13v7" />
    </svg>
  );
}

// ... 其他圖標
