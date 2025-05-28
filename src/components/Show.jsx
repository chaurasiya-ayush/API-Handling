import React, { useEffect, useState, useRef } from 'react';
import Loading from './Loading';
import axios from "../Utilities/axios";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Show = () => {
  const [products, setProducts] = useState([]);
  const cardsRef = useRef([]);

  const getProduct = () => {
    const api = "/products";
    axios
      .get(api)
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });
      });
    }
  }, [products]);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700 drop-shadow-sm">
        Product Listings
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((p, index) => (
            <li
              ref={(el) => (cardsRef.current[index] = el)}
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-contain mb-4 rounded-lg bg-gray-100"
              />
              <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                {p.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                Category: <span className="text-gray-700">{p.category}</span>
              </p>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {p.description}
              </p>
              <div className="mt-auto">
                <span className="text-xl font-bold text-green-600">
                  ₹{p.price}
                </span>
              </div>
            </li>
          ))
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
};

export default Show;