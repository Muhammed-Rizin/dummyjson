import React from "react";
import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.add(i);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const pagesToShow = getPageNumbers();

  return (
    <div className="flex justify-center mt-4 gap-2">
      {pagesToShow.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && pagesToShow[index - 1] !== page - 1 && <span className="px-2">...</span>}
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 py-2 ${
              currentPage === page ? "bg-[#fdc936]" : "bg-[#c0e3e5]"
            } text-[#322625] rounded-lg hover:opacity-90 transition duration-300`}
          >
            {page}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pagination;
