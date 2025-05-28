import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ApiHome = () => {
  const headingRef = useRef(null);
  const featureRefs = useRef([]);
  const gravityRefs = useRef([]);

  const features = [
    {
      title: "Services",
      description: "Browse all users fetched from API",
      link: "/services",
    },
    {
      title: "Show Products",
      description: "View all available products",
      link: "/show",
    },
    {
      title: "Carts",
      description: "Check cart details with products",
      link: "/cart",
    },
  ];

  useEffect(() => {
    gsap.from(featureRefs.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.5,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    gravityRefs.current.forEach((el) => {
      const animateBlock = () => {
        const size = 30 + Math.random() * 50;
        const startX = Math.random() * window.innerWidth;

        gsap.set(el, {
          x: startX,
          y: -150,
          opacity: 1,
          rotate: Math.random() * 360,
          width: size,
          height: size,
          backgroundColor: `hsl(${Math.random() * 200 + 180}, 70%, 60%)`,
        });

        gsap.to(el, {
          y: window.innerHeight + 200,
          x: startX + (Math.random() - 0.5) * 100,
          rotate: `+=${Math.random() * 360}`,
          opacity: 0,
          duration: 6 + Math.random() * 3,
          delay: Math.random() * 3,
          ease: "power1.inOut",
          onComplete: animateBlock,
        });
      };

      animateBlock();
    });
  }, []);

  const disturbGravity = (el) => {
    gsap.to(el, {
      x: `+=${(Math.random() - 0.5) * 200}`,
      y: `-=${Math.random() * 150}`,
      rotate: `+=${(Math.random() - 0.5) * 180}`,
      scale: 1.3,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <div className="relative   min-h-[90vh] bg-gradient-to-br from-sky-100 to-white py-10 px-6 overflow-hidden">

      {/* Falling Blocks */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (gravityRefs.current[i] = el)}
          onMouseEnter={(e) => disturbGravity(e.currentTarget)}
          className="absolute rounded-xl shadow-lg"
          style={{ width: 50, height: 50 }}
        />
      ))}

      {/* Combined Heading + Form Box */}
      <div
        className="w-full max-w-3xl ms-[20%]   border border-blue-200 rounded-3xl p-10 shadow-2xl z-10 text-center mb-16"
        ref={(el) => {
          gsap.fromTo(
            el,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
          );
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-10">
          Welcome to API Dashboard 🚀
        </h1>
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Enter Your Details to Access
        </h2>
        <form className="space-y-6 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Access Dashboard
          </button>
        </form>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl z-10 mb-16">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            ref={(el) => (featureRefs.current[index] = el)}
            className="bg-white border border-blue-200 hover:border-blue-500 hover:shadow-2xl p-10 rounded-3xl transition transform hover:-translate-y-2"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              {feature.title}
            </h2>
            <p className="text-gray-600 text-lg">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ApiHome;
