import { twMerge } from "tw-merge";

export function ColorSelect({ value, onChange, options, title }) {
  return (
    <div className="flex flex-col items-start space-y-2">
      <span className="text-sm font-semibold">{title}</span>
      <div className="flex flex-wrap gap-2">
        {Object.entries(options).map(([color, name]) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={twMerge(
              `h-8 w-8 rounded-full border-2`,
              value === color
                ? "border-black ring-2 ring-black ring-offset-2"
                : "border-gray-300",
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${name}`}
          />
        ))}
      </div>
    </div>
  );
}
