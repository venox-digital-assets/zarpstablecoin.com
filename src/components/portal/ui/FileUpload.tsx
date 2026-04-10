import { useRef, useState, useCallback } from 'react';

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  required?: boolean;
  hint?: string;
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
  className?: string;
}

export default function FileUpload({
  label,
  accept = '.jpg,.jpeg,.png,.pdf',
  multiple = false,
  maxFiles = 1,
  required,
  hint,
  files,
  onChange,
  error,
  className = '',
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    if (multiple) {
      const combined = [...files, ...arr].slice(0, maxFiles);
      onChange(combined);
    } else {
      onChange([arr[0]]);
    }
  }, [files, multiple, maxFiles, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-slate-500 mb-1.5">{hint}</p>}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-[#009A35] bg-green-50'
            : error
              ? 'border-red-300 hover:border-red-400'
              : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <svg className="mx-auto w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-[#009A35]">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {accept.replace(/\./g, '').toUpperCase().replace(/,/g, ', ')}
          {multiple && ` (up to ${maxFiles} files)`}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between bg-slate-50 rounded px-3 py-2 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate text-slate-700">{file.name}</span>
                <span className="text-xs text-slate-400 shrink-0">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="ml-2 text-slate-400 hover:text-red-500 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
