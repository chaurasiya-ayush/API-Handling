import axios from "axios";
import Loading from "./components/Loading";
import Show from "./components/Show";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import ApiHome from "./components/ApiHome";
import Service from "./components/Services";
import Services from "./components/Services";
import Carts from "./components/Carts";
const App = () => {
  
  return (
    <div className="container pt-[5%] pl-[5%]">
      
     <nav className="flex justify-evenly " >
      <Link to={"/"}>Home</Link>
      <Link to={"/services"}>Services</Link>
      <Link to={"/show"}>Show</Link>
      <Link to={"/cart"}>Cart</Link>
     </nav>
     <hr  className="mb-5 mt-5" />
     <Routes>
      <Route path="/" element={<ApiHome/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/show" element={<Show/>} />
      <Route path="/cart" element={<Carts/>} />
     </Routes>
     
    </div>
  );
};

export default App;
