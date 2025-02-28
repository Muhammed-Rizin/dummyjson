export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  username: string;
  country: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  eyeColor: string;

  address: { country: string };
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
}

export interface UserFilter {
  searchBy?: string;
  search: string;
}

export interface UserFetch {
  page: number;
  pageSize: number;
  search?: string;
  searchBy?: string;
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: string;
  stock: string;
  description: string;
  rating: string;
  sku: string;
}

export interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
}

export interface ProductFilter {
  searchBy?: keyof Product;
  search: string;
  category?: string;
}

export interface ProductFetch {
  page: number;
  pageSize: number;
  category?: string;
}

export interface Column {
  label: string;
  field: string;
  className?: string;
}

export interface DataTableProps {
  data: User[] | Product[];
  columns: Column[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface FilterProps {
  onSearch: (value: string) => void;
  onPageSizeChange: (value: number) => void;
  onSearchByChange: (value: string) => void;
  fields: { value: string; label: string }[];
  searchBy?: string;
  children?: React.ReactNode;
}

export interface SearchInputProps {
  onSearch: (value: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
