import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import ProductsPage from "./pages/Products";

const App: React.FC = () => {
  const location = useLocation();

  const showNavigation = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-grey-100">
      {showNavigation && (
        <nav className="bg-black p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-xl ">
              Dashboard
            </Link>
            <div className="flex space-x-4">
              <Link to="/users" className="text-white hover:text-blue-500 transition duration-300">
                Users
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-yellow-500 transition duration-300"
              >
                Products
              </Link>
            </div>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
};

export default App;
