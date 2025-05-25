import React, { useEffect, useState } from "react";
import axios from "../Utilities/axios";
import Loading from "./Loading";
const Carts = () => {

  const [carts, setCarts] = useState([]);
  const getCarts = () => {
    const api = "/carts";
    axios
      .get(api)
      .then((carts) => {
        console.log(carts.data);
        setCarts(carts.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCarts();
  }, []); // ← Added dependency array for proper mounting/unmounting behavior

  return <div>
    {       
        
        <div className="flex items-center justify-center min-h-[80vh] bg-white px-5">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-blue-600 drop-shadow-sm mb-8 text-center">
          Carts Overview
        </h1>

        <ul className="space-y-6">
          {carts.length >0 ? (
            carts.map((cart, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-lg flex flex-col gap-4 transition hover:scale-[1.01] hover:shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-800">
                Cart ID: {cart.id}
              </h2>
              <p className="text-gray-600 text-sm">User ID: {cart.userId}</p>
              <p className="text-gray-600 text-sm">Date: {cart.date}</p>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-800 mb-2">Products:</h3>
                {cart.products.length > 0 ? (
                  <ul className="space-y-2">
                    {cart.products.map((product, pIndex) => (
                      <li
                        key={pIndex}
                        className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-200"
                      >
                        <span className="text-gray-700 text-sm">
                          Product ID: {product.productId}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Qty: {product.quantity}
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
          ))
          ):<Loading/>}
        </ul>
      </div>
    </div>

    }
  </div>;
};

export default Carts;
