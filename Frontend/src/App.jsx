import React from "react";
import {Routes,Route} from "react-router-dom";
import {ProtectedRoute} from "../src/util/componente/protectedRoute";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Products from "./pages/shop";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import RootLayout from "./Layouts/root";
import RegistrationLayout from "./Layouts/compnents/registration";


function App() {
  return ( 
  <Routes>
    <Route element={<RegistrationLayout/>}>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    </Route>
   <Route element={<RootLayout/>}>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Products />} />
    <Route path="/shop/:id" element={<ProductDetails />} />

    <Route path="/cart" element={<ProtectedRoute />}>
      <Route index element={<Cart />} />
    </Route> 
    <Route path="/profile" element={<ProtectedRoute />}>
      <Route index element={<Profile />} />
   </Route>

   </Route>
  </Routes>
  );
}

export default App
