
import React, { useEffect, useState, useRef } from "react";
import "../Styles/EditConfirmationModel.css";
import {
  FiX,
  FiUploadCloud,
  FiEdit3,
  FiAlertCircle,
} from "react-icons/fi";

export const EditConfirmationModal = ({
  title = "Edit Story",
  post,
  onClose,
  onUpdate,
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    body: post?.des || "",
    file: null,
    filePreview: post?.img || null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files?.length > 0) {
      const selectedFile = files[0];

      if (!selectedFile.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          file: "Please select a valid image file",
        }));
        e.target.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          file: selectedFile,
          filePreview: reader.result,
        }));

        setErrors((prev) => ({
          ...prev,
          file: "",
        }));
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Content is required";
    }

    if (!formData.filePreview) {
      newErrors.file = "An image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const updatedPost = {
      ...post,
      title: formData.title.trim(),
      des: formData.body.trim(),
      img: formData.filePreview,
    };

    onUpdate(updatedPost);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="post-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-post-title"
    >
      <div className="post-modal-container">
        <div className="post-modal-header">
          <div className="modal-title-group">
            <FiEdit3 className="header-icon" />

            <h2
              id="edit-post-title"
              className="post-modal-title"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close edit form"
          >
            <FiX />
          </button>
        </div>

        <form
          className="post-modal-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Story Title */}

          <div className="post-field-group">
            <label htmlFor="edit-story-title" className="field-label">
              Story Title
            </label>

            <input
              id="edit-story-title"
              type="text"
              name="title"
              className={`modal-input ${
                errors.title ? "has-error" : ""
              }`}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an attractive story title..."
            />

            {errors.title && (
              <span className="field-error-msg">
                <FiAlertCircle />
                {errors.title}
              </span>
            )}
          </div>

          {/* Story Content */}

          <div className="post-field-group">
            <label htmlFor="edit-story-content" className="field-label">
              Story Content
            </label>

            <textarea
              id="edit-story-content"
              name="body"
              rows="5"
              className={`modal-textarea ${
                errors.body ? "has-error" : ""
              }`}
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your story here..."
            />

            {errors.body && (
              <span className="field-error-msg">
                <FiAlertCircle />
                {errors.body}
              </span>
            )}
          </div>

          {/* Cover Image */}

          <div className="post-field-group">
            <label className="field-label">
              Cover Image
            </label>

            <div
              className="modal-upload-row"
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <FiUploadCloud />

              <span>
                Change Cover Image
              </span>

              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </div>

            {formData.filePreview && (
              <div className="post-image-preview">
                <img
                  src={formData.filePreview}
                  alt="Selected cover preview"
                />
              </div>
            )}

            {errors.file && (
              <span className="field-error-msg">
                <FiAlertCircle />
                {errors.file}
              </span>
            )}
          </div>

          {/* Actions */}

          <div className="post-modal-actions">
            <button
              type="button"
              className="post-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="post-btn-submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditConfirmationModal;
