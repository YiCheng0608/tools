export type ImageFormat = "jpg" | "png" | "webp" | "svg";

interface ConversionRule {
  from: ImageFormat;
  to: ImageFormat[];
}

export const ConversionRules: ConversionRule[] = [
  {
    from: "jpg",
    to: ["png", "webp", "svg"],
  },
  {
    from: "png",
    to: ["jpg", "webp", "svg"],
  },
  {
    from: "webp",
    to: ["jpg", "png", "svg"],
  },
  {
    from: "svg",
    to: ["jpg", "png", "webp"],
  },
];

export async function convertImage(
  file: File,
  toFormat: ImageFormat
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Cannot get canvas context"));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (toFormat === "svg") {
        // 將 Canvas 轉換為 SVG
        const svgString = `
          <svg width="${canvas.width}" height="${
          canvas.height
        }" xmlns="http://www.w3.org/2000/svg">
            <image
              width="${canvas.width}"
              height="${canvas.height}"
              href="${canvas.toDataURL("image/png")}"
            />
          </svg>
        `;
        resolve(new Blob([svgString], { type: "image/svg+xml" }));
        return;
      }

      const mimeTypes: Record<Exclude<ImageFormat, "svg">, string> = {
        jpg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
      };

      const quality =
        toFormat === "jpg" || toFormat === "webp" ? 0.9 : undefined;

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Conversion failed"));
        },
        mimeTypes[toFormat as Exclude<ImageFormat, "svg">],
        quality
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // 如果輸入是 SVG，需要特殊處理
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error("Failed to read SVG file"));
      };
      reader.readAsDataURL(file);
    } else {
      img.src = URL.createObjectURL(file);
    }
  });
}

export function getAvailableOutputFormats(
  inputFormat: ImageFormat
): ImageFormat[] {
  const rule = ConversionRules.find((r) => r.from === inputFormat);
  return rule ? rule.to : [];
}

function getImageFormat(file: File): ImageFormat | undefined {
  // 處理檔案類型判斷
  const extension = file.name.split(".").pop()?.toLowerCase();
  const mimeType = file.type.toLowerCase();

  if (
    mimeType.includes("jpeg") ||
    extension === "jpg" ||
    extension === "jpeg"
  ) {
    return "jpg";
  }
  if (mimeType.includes("png") || extension === "png") {
    return "png";
  }
  if (mimeType.includes("webp") || extension === "webp") {
    return "webp";
  }
  if (mimeType.includes("svg") || extension === "svg") {
    return "svg";
  }
  return undefined;
}

export { getImageFormat };
