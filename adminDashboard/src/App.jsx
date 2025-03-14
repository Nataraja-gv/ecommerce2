import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./layout/navbar";
import CategoryPage from "./pages/CategoryPage ";
import ProductPage from "./pages/ProductPage";
import BannerPage from "./pages/Banner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="category" element={<CategoryPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="banner" element={<BannerPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
