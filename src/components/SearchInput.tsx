import React from "react";
import { SearchInputProps } from "../types";

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded bg-white text-[#322625] focus:outline-none focus:ring-2 focus:ring-[#c0e3e5]"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
