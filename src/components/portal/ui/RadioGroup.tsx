interface RadioGroupProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  required,
  error,
  className = '',
}: RadioGroupProps) {
  const name = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <fieldset className={className}>
      <legend className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </legend>
      <div className="flex gap-6">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 text-[#009A35] border-slate-300 focus:ring-[#009A35]"
            />
            <span className="text-sm text-slate-700">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </fieldset>
  );
}
