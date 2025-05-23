import { twMerge } from "tw-merge";

export function CepSelect({
  title,
  value,
  onChange,
  className,
  type = "text",
  placeholder,
}) {
  return (
    <div className="relative dark:text-black">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || title}
        className={twMerge(
          `w-24 appearance-none border border-gray-300 bg-white p-4 ${className}`,
        )}
      />
    </div>
  );
}
