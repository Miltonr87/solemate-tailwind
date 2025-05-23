import { useState } from "react";
import { QTY, SIZES } from "../constant";
import { Select } from "./Select";
import { Input } from "./Input";

export function ShoeDetail({ shoe, onClickAdd }) {
  const [form, setForm] = useState({ qty: null, size: null });
  const [cep, setCep] = useState("");
  const [cepError, setCepError] = useState("");

  const validateCep = (value) => {
    const cleaned = value.replace(/\D/g, "");
    return /^[0-9]{8}$/.test(cleaned);
  };

  const handleCepChange = (e) => {
    const value = e.target.value;
    setCep(value);
    if (!validateCep(value)) {
      setCepError("Invalid CEP (use 8 digits)");
    } else {
      setCepError("");
    }
  };

  return (
    <div className="flex flex-col space-y-4 dark:text-white lg:flex-row-reverse">
      {/* Shoe image */}
      <div className="flex-1 lg:-mt-32 lg:ml-28">
        <div className="flex-center h-full bg-gradient-to-br from-[#F637CF] from-5% via-[#E3D876] via-40% to-[#4DD4C6]">
          <img className="animate-float" src={shoe.src} />
        </div>
      </div>

      {/* Shoe details */}
      <div className="flex-1 space-y-6">
        <div className="text-5xl font-black md:text-9xl">{shoe.title}</div>
        <div className="font-medium md:text-xl">{shoe.description}</div>

        {/* Price, Selects, and CEP */}
        <div className="flex flex-wrap items-start gap-4">
          <div className="text-3xl font-extrabold md:text-6xl">
            {shoe.price} $
          </div>

          <Select
            value={form.qty}
            onChange={(qty) => setForm({ ...form, qty })}
            title={"QTY"}
            options={QTY}
          />

          <Select
            value={form.size}
            onChange={(size) => setForm({ ...form, size })}
            title={"SIZE"}
            options={SIZES}
          />

          {/* CEP Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="cep">
              CEP
            </label>
            <Input
              id="cep"
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="12345678"
              className="w-32 rounded border px-2 py-1 dark:text-black"
            />
            {cepError && (
              <span className="mt-1 text-sm text-red-500">{cepError}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-x-10">
          <button
            onClick={() => onClickAdd(shoe, form.qty, form.size)}
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
