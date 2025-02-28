import React from "react";
import SearchInput from "./SearchInput";
import { FilterProps } from "../types";

const Filters: React.FC<FilterProps> = ({
  onSearchByChange,
  onPageSizeChange,
  onSearch,
  fields,
  searchBy,
  children,
}) => {
  const pageSizes = [5, 10, 20, 50];

  return (
    <div className="flex gap-3">
      <select
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="text-sm p-2 border rounded bg-white text-[#322625] focus:outline-none focus:ring-2 focus:ring-[#c0e3e5]"
      >
        {pageSizes.map((size) => (
          <option value={size}>{size}</option>
        ))}
      </select>

      <SearchInput onSearch={onSearch} />

      {fields.map((field) => (
        <div
          key={field.value}
          className={`p-2 border rounded bg-white text-[#322625] cursor-pointer transition duration-300 text-sm flex items-center ${
            searchBy === field.value
              ? "bg-[#f0f0f0] font-bold ring-2 ring-[#c0e3e5]"
              : "hover:bg-[#f0f0f0]"
          }`}
          onClick={() => onSearchByChange(searchBy !== field.value ? field.value : "")}
        >
          <span> {field.label}</span>
        </div>
      ))}
      {children ? <>{children}</> : ""}
    </div>
  );
};

export default Filters;
