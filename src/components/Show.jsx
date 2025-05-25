import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import axios from "../Utilities/axios";

const Show = () => {

const [products, setProducts] = useState([]);
  const getProduct = () => {
    const api = "/products";
    axios
      .get(api)
      .then((products) => {
        console.log(products);
        setProducts(products.data);
      })
      .catch((err) => console.log(err));
  };
    useEffect(()=>{
      getProduct();
    })
  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Listings</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p, index) => (
            <li
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-contain mb-4 rounded-lg bg-gray-50"
              />
              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-500 text-sm mb-1">
                Category: <span className="text-gray-700">{p.category}</span>
              </p>
              <p className="text-gray-600 text-sm mb-3">{p.description}</p>
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
    </>
  )
}

export default Show
