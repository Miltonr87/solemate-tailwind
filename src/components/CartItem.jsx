import { CiTrash } from "react-icons/ci";
import { Select } from "../components/Select";
import { SIZES, QTY } from "../constant";

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

export function CartItem({
  item: { product, qty, size, color, cep },
  onClickTrash,
}) {
  console.log("item", product);
  return (
    <div
      className={
        "cursor-pointer space-y-2 bg-gray-50 p-2 hover:bg-[#DAFFA2] dark:bg-transparent dark:hover:bg-night-50"
      }
    >
      <div className="flex space-x-2">
        {/* Image */}
        <img className="h-24" src={product.src} alt={product.title} />
        <div className="flex-1 space-y-2">
          {/* Title & Description */}
          <div className="font-bold dark:text-white">{product.title}</div>
          <div className="text-sm text-gray-400">{product.description}</div>

          {/* Color */}
          {color && (
            <div className="mt-1 flex items-center space-x-2">
              <div
                className="h-5 w-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={`Selected color ${COLORS[color] || color}`}
              />
              <span className="text-sm dark:text-white">
                Color: {COLORS[color] || color}
              </span>
            </div>
          )}

          {/* CEP */}
          {cep && (
            <div className="mt-1 text-sm dark:text-white">CEP: {cep}</div>
          )}
        </div>

        {/* Price */}
        <div className="font-bold dark:text-white">{product.price}$</div>
      </div>

      <div className="flex justify-between pl-32">
        <div className="flex space-x-6">
          <div>
            <div className="font-bold dark:text-white">SIZE</div>
            <Select
              value={size}
              title=""
              options={SIZES}
              className={"w-16 p-1 pl-2"}
            />
          </div>
          <div>
            <div className="font-bold dark:text-white">QTY</div>
            <Select
              value={qty}
              title=""
              options={QTY}
              className={"w-16 p-1 pl-2"}
            />
          </div>
        </div>
        <button onClick={() => onClickTrash(product.id)}>
          <CiTrash size={25} className="text-black dark:text-white" />
        </button>
      </div>
    </div>
  );
}
