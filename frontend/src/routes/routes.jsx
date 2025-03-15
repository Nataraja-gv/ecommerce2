import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/home";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signup";

const RoutesPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesPage;
