import React, { useEffect } from "react";
import "../Styles/LogoutModel.css";
import { createPortal } from "react-dom";
import { FiLogOut, FiX } from "react-icons/fi";

function LogoutModel({ handleLogout, handlecancleModel }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handlecancleModel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlecancleModel]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handlecancleModel();
    }
  };

  const modalContent = (
    <div
      className="logoutmodel-container"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div className="logout-card">
        <button
          type="button"
          className="logout-close-btn"
          onClick={handlecancleModel}
          aria-label="Close"
        >
          <FiX />
        </button>

        <div className="logout-icon-wrap">
          <FiLogOut className="logout-icon" />
        </div>

        <h3 id="logout-title" className="logout-title">
          Confirm Sign Out
        </h3>
        <p className="logout-text">
          Are you sure you want to end your current session? You'll need to log in again to publish or manage stories.
        </p>

        <div className="btn-container">
          <button
            type="button"
            className="cancle-btn"
            onClick={handlecancleModel}
          >
            Stay Logged In
          </button>
          <button
            type="button"
            className="yes-btn"
            onClick={handleLogout}
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );

  const portalTarget = document.getElementById("model") || document.body;
  return createPortal(modalContent, portalTarget);
}

export default LogoutModel;
