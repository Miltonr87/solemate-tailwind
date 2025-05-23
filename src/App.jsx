import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { NewArrivalsSection } from "./components/NewArrivalsSection";
import { ShoeDetail } from "./components/ShoeDetail";
import { Sidebar } from "./components/Sidebar";
import { SHOE_LIST } from "./constant";
import { Cart } from "./components/Cart";
import { BiMoon, BiSun } from "react-icons/bi";

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentShoe, setCurrentShoe] = useState(SHOE_LIST[0]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode === "true") {
      window.document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    window.document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "isDarkMode",
      window.document.documentElement.classList.contains("dark"),
    );
  };

  const removeFromCart = (productId) => {
    console.log("***", productId);
    const updatedCartItems = [...cartItems];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId,
    );
    updatedCartItems.splice(existingItemIndex, 1);
    setCartItems(updatedCartItems);
  };

  // Updated addToCart now receives color and cep
  const addToCart = (product, qty, size, color, cep) => {
    if (qty && size && color && cep) {
      const updatedCartItems = [...cartItems];
      // Find if the exact same product with same options already exists in cart
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color &&
          item.cep === cep,
      );

      if (existingItemIndex > -1) {
        // If found, update quantity
        updatedCartItems[existingItemIndex].qty = qty;
      } else {
        // Otherwise, add new item
        updatedCartItems.push({ product, qty, size, color, cep });
      }

      setCartItems(updatedCartItems);
    } else {
      console.warn(
        "Please select quantity, size, color, and enter a valid CEP.",
      );
    }
  };

  return (
    <div className="animate-fadeIn p-10 dark:bg-night xl:px-24">
      <Nav onClickShoppingBtn={() => setIsSidebarOpen(true)} />
      <ShoeDetail shoe={currentShoe} onClickAdd={addToCart} />
      <NewArrivalsSection items={SHOE_LIST} onClickCard={setCurrentShoe} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClickClose={() => setIsSidebarOpen(false)}
      >
        <Cart cartItems={cartItems} onClickTrash={removeFromCart} />
      </Sidebar>
      <div className=" fixed bottom-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="rounded-full bg-night-50 px-4 py-2 text-white shadow-lg dark:bg-white dark:text-night"
        >
          <BiSun className="hidden dark:block" />
          <BiMoon className="dark:hidden" />
        </button>
      </div>
    </div>
  );
}
