import axios from "../Utilities/axios";
import React, { useContext, useEffect, useRef } from "react";
import Loading from "./Loading";
import { usersContext } from "../Utilities/ContextData";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Services = () => {
  const { users, setUsers } = useContext(usersContext);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Fetch users only if not already available
    if (users.length === 0) {
      axios.get("/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Failed to load users:", err));
    }
  }, [users, setUsers]);

  useEffect(() => {
    // Animate user cards on mount
    if (users.length > 0) {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, [users]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-tr from-blue-50 to-white px-5">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-md mb-10 text-center">
          👥 Users Directory
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.length > 0 ? (
            users.map((user, index) => (
              <Link
                to={`/services/${user.id}`}
                key={user.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-5 flex flex-col items-center text-center"
              >
                <img
                  src={user.photo || "https://placehold.co/100x100"}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover border mb-4"
                />
                <h2 className="text-lg font-semibold text-blue-800">
                  {user.username}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </Link>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
