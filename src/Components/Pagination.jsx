import React, { useContext } from "react";
import "../Styles/Pagination.css";
import { toggleTheame } from "../Context/TheameContextProvider";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  prevPage,
  nextPage,
  currentPage,
  totalPage,
}) {
  const { mode } = useContext(toggleTheame);

  return (
    <div className="pagination-wrapper">
      <div className={`pagination-container ${mode === "dark" ? "pag-dark" : "pag-light"}`}>
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pag-btn prev-btn"
          aria-label="Previous page"
        >
          <FiChevronLeft className="pag-icon" />
          <span>Previous</span>
        </button>

        <div className="page-counter-pill">
          <span className="current-page-num">{currentPage}</span>
          <span className="page-divider">/</span>
          <span className="total-pages-num">{totalPage}</span>
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalPage}
          className="pag-btn next-btn"
          aria-label="Next page"
        >
          <span>Next</span>
          <FiChevronRight className="pag-icon" />
        </button>
      </div>
    </div>
  );
}
