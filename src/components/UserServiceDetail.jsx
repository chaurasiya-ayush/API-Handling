import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../Utilities/axios";
import Loading from "./Loading";
import gsap from "gsap";

const Carts = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const cardRefs = useRef([]);

  const getUserAndCart = async () => {
    try {
      const res = await axios.get("https://fake-json-api.mock.beeceptor.com/users");
      const users = res.data;

      // Convert id from URL (string) to number
      const matchedUser = users.find((u) => String(u.id) === String(id));

      if (matchedUser) {
        setUser(matchedUser);

        // Simulate cart for this user
        const simulatedCart = [
          {
            id: 101,
            date: "2024-04-05",
            products: [
              { productId: 11, quantity: 2 },
              { productId: 22, quantity: 1 },
            ],
          },
        ];

        setCarts(simulatedCart);
      }
    } catch (err) {
      console.error("Failed to fetch user/cart data", err);
    }
  };

  useEffect(() => {
    if (id) getUserAndCart();
  }, [id]);

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

  if (!user || carts.length === 0) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-50 to-white px-5 py-10">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-md mb-10 text-center">
          🛒 Cart Overview for {user.name}
        </h1>

        <div className="mb-10 p-6 rounded-2xl bg-white shadow-lg flex items-center gap-6 border border-gray-200">
          <img
            src={user.photo}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover shadow-sm"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.company}</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>📧 Email: {user.email}</p>
              <p>📱 Phone: {user.phone}</p>
              <p>🏠 Address: {user.address}, {user.state}, {user.zip}, {user.country}</p>
              <p>👤 Username: {user.username}</p>
            </div>
          </div>
        </div>

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
              <p className="text-gray-600 text-sm">📅 Date: {cart.date}</p>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-800 mb-2">🧾 Products:</h3>
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
                  <p className="text-sm text-gray-400 italic">No products in this cart.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carts;
  