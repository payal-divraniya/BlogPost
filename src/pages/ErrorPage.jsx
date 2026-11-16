import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/ErrorPage.css";
import { toggleTheame } from "../Context/TheameContextProvider";
import { FiAlertCircle, FiArrowLeft, FiHome } from "react-icons/fi";

function ErrorPage() {
  const navigate = useNavigate();
  const { mode } = useContext(toggleTheame);

  return (
    <div className={`error-page-wrapper ${mode === "light" ? "error-light" : "error-dark"}`}>
      <Navbar />
      <main className="error-content-box">
        <div className="error-badge">
          <FiAlertCircle className="error-icon" />
          <span>Error 404</span>
        </div>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-desc">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>

        <div className="error-actions">
          <button
            type="button"
            className="btn-error-back"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/" className="btn-error-home">
            <FiHome /> Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
