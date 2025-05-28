import React, { useEffect, useState, useRef } from "react";
import axios from "../Utilities/axios";
import Loading from "./Loading";
import gsap from "gsap";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const cardRefs = useRef([]);

  const getCarts = () => {
    axios
      .get("/carts")
      .then((res) => setCarts(res.data))
      .catch((err) => console.error("Cart fetch failed", err));
  };

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    if (carts.length > 0) {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [carts]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-50 to-white px-5 py-10">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-md mb-10 text-center">
          🛒 Cart Overview
        </h1>

        {carts.length > 0 ? (
          <ul className="space-y-6">
            {carts.map((cart, index) => (
              <li
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xl flex flex-col gap-4 hover:scale-[1.01] transition-transform duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  Cart ID: <span className="text-blue-600">{cart.id}</span>
                </h2>
                <p className="text-gray-600 text-sm">
                  👤 User ID: <span className="text-gray-800">{cart.userId}</span>
                </p>
                <p className="text-gray-600 text-sm">📅 Date: {cart.date}</p>

                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    🧾 Products:
                  </h3>
                  {cart.products.length > 0 ? (
                    <ul className="space-y-2">
                      {cart.products.map((product, pIndex) => (
                        <li
                          key={pIndex}
                          className="p-3 bg-gray-50 rounded-xl flex justify-between border border-gray-200 shadow-sm"
                        >
                          <span className="text-gray-700 text-sm">
                            🆔 Product ID: {product.productId}
                          </span>
                          <span className="text-gray-500 text-sm">
                            🔢 Qty: {product.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No products in this cart.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Carts;
