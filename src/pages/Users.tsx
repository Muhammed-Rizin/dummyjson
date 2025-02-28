import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setPageSize, setPage } from "../features/usersSlice";
import { AppDispatch, RootState } from "../app/store";

import DataTable from "../components/DataTable";
import Filters from "../components/Filters";
import { UserFilter } from "../types";

const UsersPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, page, pageSize, total } = useSelector((state: RootState) => state.users);

  const [filters, setFilters] = useState<UserFilter>({ search: "" });

  useEffect(() => {
    dispatch(fetchUsers({ page, pageSize, ...filters }));
  }, [dispatch, page, pageSize, filters]);

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

  const filteredData = data.filter((user) => {
    if (!filters.searchBy) {
      return Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    return true;
  });

  const searchFields = [
    { label: "First Name", value: "firstName" },
    { label: "Username", value: "username" },
    { label: "Mobile", value: "mobile" },
    { label: "Email", value: "email" },
    { label: "Gender", value: "gender" },
    { label: "Blood Group", value: "bloodGroup" },
  ];

  const columns = [
    { label: "#", field: "id", className: "text-center" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Maiden Name", field: "maidenName" },
    { label: "Username", field: "username" },
    { label: "Mobile No.", field: "phone", className: "text-center" },
    { label: "Email", field: "email" },
    { label: "Age", field: "age", className: "text-center" },
    { label: "Gender", field: "gender" },
    { label: "Blood Group", field: "bloodGroup", className: "text-center" },
    { label: "Eye Color", field: "eyeColor" },
  ];

  return (
    <div className="container mx-auto p-4 bg-[#ebebeb] min-h-screen">
      <h4 className="text-[#322625] mb-8">Users</h4>
      <Filters
        fields={searchFields}
        searchBy={filters.searchBy}
        onSearch={(value) => handleFilter("search", value)}
        onSearchByChange={(value) => handleFilter("searchBy", value)}
        onPageSizeChange={(value) => handleStateChange("pageSize", value)}
      />

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

export default UsersPage;
