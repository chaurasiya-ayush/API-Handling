import axios from "../Utilities/axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Services = () => {
  // const [first, setFirst] = useState("This is an normal data")
  // const [second, setSecond] = useState("This is an very large data")
const [users, setUsers] = useState([]);
     const getUsers = () => {
    const api = "/users";
    axios
      .get(api)
      .then((users) => {
        console.log(users.data);
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getUsers()
  },[]); // ← Added dependency array for proper mounting/unmounting behavior

  return (
    <>
   <div className="flex items-center justify-center min-h-[80vh] bg-white px-5">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-blue-600 drop-shadow-sm mb-8 text-center">
          Users List
        </h1>

        <ul className="space-y-5">
          {users.length > 0 ? (
            users.map((user, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-lg flex flex-col gap-3 transition hover:scale-[1.005] hover:shadow-xl"
            >
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-gray-900">ID:</span>{" "}
                {user.id}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-gray-900">Username:</span>{" "}
                {user.username}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {user.email}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-gray-900">Password:</span>{" "}
                {user.password}
              </p>
            </li>
          ))
          ):<Loading/>}
        </ul>
      </div>
    </div>



    </>
  );
};

export default Services;

