import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5]">
      <h1 className="text-4xl text-[#322625] mb-8">Welcome to the Dashboard</h1>

      <div className="flex space-x-4">
        <Link
          to="/users"
          className="bg-[#fec933] text-[#322625] px-6 py-3 rounded-lg shadow-md hover:bg-[#e6b42e] hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
        >
          Go to Users
        </Link>

        <Link
          to="/products"
          className="bg-[#bfe5e6] text-[#322625] px-6 py-3 rounded-lg shadow-md hover:bg-[#a8d0d1] hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
