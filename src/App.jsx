import axios from "axios";
import Loading from "./components/Loading";
import Show from "./components/Show";
import ApiHome from "./components/ApiHome";
import Services from "./components/Services";
import Carts from "./components/Carts";
import UserServiceDetail from "./components/UserServiceDetail";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink, Routes, Route } from "react-router-dom";

const App = () => {
  const navRef = useRef(null);
  const activeLinkRefs = useRef({});

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  // Animate active links
  useEffect(() => {
    Object.values(activeLinkRefs.current).forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.6)",
          }
        );
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav
        ref={navRef}
        className="bg-white shadow-md px-6 py-6 flex  justify-between items-center sticky top-0 z-50"
      >
        <div className="text-3xl font-bold text-blue-600 tracking-wide animate-pulse">
          Ayush
        </div>

        {/* Navigation Links with NavLink */}
        <div className="space-x-6 text-gray-700 text-xl ">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Users" },
            { to: "/show", label: "Products" },
            { to: "/cart", label: "Carts" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              ref={(el) => (activeLinkRefs.current[to] = el)}
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "text-blue-700 font-extrabold text-2xl font-mono underline underline-offset-4"
                    : "hover:text-blue-600"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ApiHome />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<UserServiceDetail />} />
          <Route path="/show" element={<Show />} />
          <Route path="/cart" element={<Carts />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
