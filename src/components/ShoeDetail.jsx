import { useState } from "react";
import { QTY, SIZES } from "../constant";
import { Select } from "./Select";
import { CepSelect } from "./CepSelect";
import { validateCep, fetchCepData } from "../utils/cepUtil";

const COLORS = {
  "#FF0000": "Red",
  "#0000FF": "Blue",
  "#00FF00": "Green",
  "#000000": "Black",
  "#FFFFFF": "White",
  "#F97316": "Orange",
  "#8B5CF6": "Purple",
  "#10B981": "Emerald",
  "#F43F5E": "Pink",
};

export function ShoeDetail({ shoe, onClickAdd }) {
  const [form, setForm] = useState({
    qty: null,
    size: null,
    color: null,
    cep: "",
  });

  const [cepError, setCepError] = useState("");
  const [cepData, setCepData] = useState(null);

  const handleCepChange = async (value) => {
    setForm((prev) => ({ ...prev, cep: value }));
    const isValid = validateCep(value);

    if (!isValid) {
      setCepError("Invalid CEP (use 8 digits)");
      setCepData(null);
      return;
    }

    try {
      const data = await fetchCepData(value);
      setCepData(data);
      setCepError("");
    } catch {
      setCepError("CEP not found");
      setCepData(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4 dark:text-white lg:flex-row-reverse">
      {/* Shoe image */}
      <div className="flex-1 lg:-mt-32 lg:ml-28">
        <div className="flex-center h-full bg-gradient-to-br from-[#F637CF] via-[#E3D876] to-[#4DD4C6]">
          <img className="animate-float" src={shoe.src} alt={shoe.title} />
        </div>
      </div>

      {/* Shoe details */}
      <div className="flex-1 space-y-6">
        <div className="text-5xl font-black md:text-9xl">{shoe.title}</div>
        <div className="font-medium md:text-xl">{shoe.description}</div>

        <div className="text-3xl font-extrabold md:text-6xl">
          {shoe.price} $
        </div>

        {/* Color selection */}
        <div className="w-full space-y-2">
          <span className="text-sm font-semibold">COLORS DISPONIBLES</span>
          <div className="flex flex-wrap gap-3">
            {Object.keys(COLORS).map((color) => (
              <button
                key={color}
                onClick={() => setForm({ ...form, color })}
                className="h-8 w-8 rounded-full border-2 transition-all duration-150 ease-in-out"
                style={{
                  backgroundColor: color,
                  borderColor: form.color === color ? "black" : "#ccc",
                  boxShadow:
                    form.color === color
                      ? "0 0 0 3px black, 0 0 0 5px white"
                      : "none",
                  transform: form.color === color ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`Select color ${COLORS[color] || color}`}
              />
            ))}
          </div>
          {form.color && (
            <div className="mt-1 text-sm font-medium">
              Selected color:{" "}
              <span
                className="mr-1 inline-block h-4 w-4 rounded-full align-middle"
                style={{ backgroundColor: form.color }}
              />
              <span>{COLORS[form.color] || form.color}</span>
            </div>
          )}
        </div>

        {/* Quantity, Size, CEP */}
        <div className="flex flex-wrap gap-4">
          <Select
            value={form.qty}
            onChange={(qty) => setForm({ ...form, qty })}
            title="QTY"
            options={QTY}
          />
          <Select
            value={form.size}
            onChange={(size) => setForm({ ...form, size })}
            title="SIZE"
            options={SIZES}
          />
          <div className="flex flex-col">
            <CepSelect
              type="text"
              value={form.cep}
              onChange={handleCepChange}
              placeholder="CEP"
              className="w-32"
            />
            {cepError && (
              <span className="mt-1 text-sm text-red-500">{cepError}</span>
            )}
          </div>
        </div>

        {/* Display user CEP */}
        <div className="mt-6 space-y-1 text-sm">
          {cepData && (
            <div className="text-xs text-gray-400">
              <div>
                <strong>Address:</strong> {cepData.logradouro}
              </div>
              <div>
                <strong>Neighborhood:</strong> {cepData.bairro}
              </div>
              <div>
                <strong>City:</strong> {cepData.localidade} - {cepData.uf}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-x-10">
          <button
            onClick={() => onClickAdd(shoe, form)}
            className="btn-press-anim h-14 w-44 bg-black text-white hover:bg-gray-900 active:bg-gray-700 dark:bg-white dark:text-black"
          >
            Add to bag
          </button>
          <a
            href="#"
            className="text-lg font-bold underline underline-offset-4"
          >
            View details
          </a>
        </div>
      </div>
    </div>
  );
}
