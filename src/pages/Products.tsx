import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductFilter } from "../types";
import { AppDispatch, RootState } from "../app/store";
import { fetchProducts, setPage, setPageSize } from "../features/productsSlice";

import DataTable from "../components/DataTable";
import Filters from "../components/Filters";

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, page, pageSize, total } = useSelector((state: RootState) => state.products);

  const [filters, setFilters] = useState<ProductFilter>({ search: "", category: "" });

  useEffect(() => {
    dispatch(fetchProducts({ page, pageSize, category: filters.category }));
  }, [dispatch, page, pageSize, filters.category]);

  const handleFilter = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (name: string, value: number) => {
    if (name === "page") {
      dispatch(setPage(value));
    }
    if (name === "pageSize") {
      dispatch(setPageSize(value));
      dispatch(setPage(1));
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const filteredData = data.filter((product) => {
    if (filters.searchBy) {
      return product[filters.searchBy]
        ?.toString()
        .toLowerCase()
        .includes(filters.search.toLowerCase());
    }

    if (filters.search) {
      return Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    return true;
  });

  const searchFields = [
    { label: "Title", value: "title" },
    { label: "Brand", value: "brand" },
    { label: "Price", value: "price" },
    { label: "Rating", value: "rating" },
    { label: "SKU", value: "sku" },
  ];

  const columns = [
    { label: "#", field: "id", className: "text-center" },
    { label: "Title", field: "title" },
    { label: "Brand", field: "brand" },
    { label: "Category", field: "category" },
    { label: "Price", field: "price", className: "text-center" },
    { label: "Discount", field: "discountPercentage", className: "text-center" },
    { label: "Stock", field: "stock", className: "text-center" },
    { label: "Description", field: "description" },
    { label: "Rating", field: "rating", className: "text-center" },
    { label: "SKU", field: "sku", className: "text-center" },
  ];

  return (
    <div className="container mx-auto p-4 bg-[#ebebeb] min-h-screen">
      <h4 className="text-[#322625] mb-8">Products</h4>
      <Filters
        fields={searchFields}
        searchBy={filters.searchBy}
        onSearch={(value) => handleFilter("search", value)}
        onSearchByChange={(value) => handleFilter("searchBy", value)}
        onPageSizeChange={(value) => handleStateChange("pageSize", value)}
      >
        <div className="flex gap-3">
          <select
            className="p-2 border rounded bg-white text-[#322625] cursor-pointer transition duration-300 focus:ring-2 focus:ring-[#c0e3e5]"
            value={filters.category}
            onChange={(e) => handleFilter("category", e.target.value)}
          >
            <option value="">ALL Category</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>
      </Filters>

      <DataTable
        data={filteredData}
        columns={columns}
        currentPage={page}
        totalPages={Math.ceil(total / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
