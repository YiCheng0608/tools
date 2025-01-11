"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  ImageFormat,
  getAvailableOutputFormats,
  convertImage,
  getImageFormat,
} from "@/utils/imageConverter";

interface ImageConverterProps {
  formats: {
    input: string;
    output: string;
    selectFile: string;
    convert: string;
    download: string;
    maxSize: string;
    dropzone: string;
    processing: string;
    error: {
      unsupported: string;
      convert: string;
      tooLarge: string;
    };
    types: Record<ImageFormat, string>;
  };
}

export default function ImageConverter({ formats }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<ImageFormat | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.size <= 10 * 1024 * 1024) {
        setFile(file);
        setOutputFormat("");
        setConvertedFile(null);
        setError(null);
      } else {
        setError(formats.error.tooLarge);
      }
    },
    [formats.error.tooLarge]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file || !outputFormat) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = await convertImage(file, outputFormat);
      setConvertedFile(URL.createObjectURL(result));
    } catch (err) {
      setError(formats.error.convert);
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFile || !outputFormat) return;

    const link = document.createElement("a");
    link.href = convertedFile;
    link.download = `converted.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inputFormat = file ? getImageFormat(file) : undefined;
  const availableOutputFormats = inputFormat
    ? getAvailableOutputFormats(inputFormat)
    : [];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div {...getRootProps()} className="mb-6">
        <input {...getInputProps()} />
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {file ? (
            <div>
              <p className="text-gray-800 font-medium">{file.name}</p>
              <p className="text-gray-600 text-sm mt-1">
                {formatFileSize(file.size)}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {formats.types[inputFormat as ImageFormat]}
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600">{formats.dropzone}</p>
              <p className="text-sm text-gray-500 mt-2">{formats.maxSize}</p>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {formats.output}
            </label>
            <select
              className="w-full p-2 border rounded"
              value={outputFormat}
              onChange={(e) => {
                setOutputFormat(e.target.value as ImageFormat);
                setConvertedFile(null);
                setError(null);
              }}
            >
              {availableOutputFormats.map((format) => (
                <option key={format} value={format}>
                  {formats.types[format]}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            onClick={handleConvert}
            disabled={!outputFormat || isProcessing}
          >
            {isProcessing ? formats.processing : formats.convert}
          </button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
          )}

          {convertedFile && (
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleDownload}
            >
              {formats.download}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
