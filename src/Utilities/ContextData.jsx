import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const usersContext = createContext();
const ContextData = (props) => {

  const [users, setUsers] = useState([1,2,3]);
   const userData = (()=>{
    const api = "https://fake-json-api.mock.beeceptor.com/users"
    axios
    .get(api)
    .then( (users)=>{
        console.log(users.data)
        setUsers(users.data)
    })
    .catch((err)=>console.log(err))
   })
   useEffect(()=>{
    userData();
   },[])
  return <usersContext.Provider  value={{users,setUsers}} >{props.children}</usersContext.Provider>;
};

export default ContextData;
