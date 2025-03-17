import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/home";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signup";
import Mens from "../pages/mens/Mens";
import Womens from "../pages/womens/Womens";
import Kids from "../pages/kids/Kids";

const RoutesPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/kids" element={<Kids />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesPage;
