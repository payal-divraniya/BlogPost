import React, { useEffect } from "react";
import "../Styles/ConfirmationModal.css";
import { FiAlertTriangle, FiX } from "react-icons/fi";

function ConfirmationModel({
  title = "Confirm Action",
  desc = "Are you sure you want to proceed?",
  onClose,
  onConfirm,
  confirmBtnText = "Confirm",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="model-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close-icon"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <FiX />
        </button>

        <div className="modal-icon-wrapper">
          <FiAlertTriangle className="warning-icon" />
        </div>

        <h3 id="confirm-modal-title" className="modal-title">
          {title}
        </h3>
        <p className="modal-desc">{desc}</p>

        <div className="modal-actions-row">
          <button
            type="button"
            className="btn-modal btn-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal btn-modal-danger"
            onClick={onConfirm}
          >
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModel;
