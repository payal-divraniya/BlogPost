import React, { useEffect, useRef, useState, useContext } from "react";
import "../Styles/PostForm.css";
import { useNavigate, Link } from "react-router-dom";
import { toggleTheame } from "../Context/TheameContextProvider";
import { FiUploadCloud, FiX, FiArrowLeft, FiCheck, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

export function PostForm() {
  const nav = useNavigate();
  const { mode } = useContext(toggleTheame);
  const titleInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    file: null,
    filePreview: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files.length > 0) {
      const selectedFile = files[0];
      if (!selectedFile.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, file: "Please select an image file" }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          file: selectedFile,
          filePreview: reader.result,
        }));
        setErrors((prev) => ({ ...prev, file: "" }));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
      filePreview: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Story title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Story content body is required";
    } else if (formData.body.trim().length < 20) {
      newErrors.body = "Story content must be at least 20 characters long";
    }

    if (!formData.filePreview) {
      newErrors.file = "Please upload a featured cover image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const postPayload = {
        title: formData.title.trim(),
        des: formData.body.trim(),
        img: formData.filePreview,
      };

      const newPost = { id: `post_${Date.now()}`, ...postPayload, createdAt: new Date().toISOString() };

      // Update local cache
      const existing = JSON.parse(localStorage.getItem("blogPosts")) || [];
      localStorage.setItem("blogPosts", JSON.stringify([newPost, ...existing]));

      toast.success("Blog post published and saved in this browser!");
      nav("/");
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error(err.message || "Could not save this post in browser storage.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`post-form-page ${mode === "light" ? "form-page-light" : "form-page-dark"}`}>
      <div className="post-form-container">
        {/* Navigation Bar */}
        <div className="form-header-bar">
          <Link to="/" className="btn-back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <span className="editor-status-pill">Editorial Creator Mode</span>
        </div>

        <div className="form-card">
          <div className="form-title-section">
            <h1 className="form-main-heading">Create New Editorial Story</h1>
            <p className="form-sub-heading">
              Draft, style, and publish your story to the global BlogPost community.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Story Title <span className="req">*</span>
              </label>
              <input
                ref={titleInputRef}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Architectural Patterns in Scalable Micro-frontends"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="error-message">
                  <FiAlertCircle /> {errors.title}
                </div>
              )}
            </div>

            {/* Body Field */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="body" className="form-label">
                  Story Content <span className="req">*</span>
                </label>
                <span className="char-counter">{formData.body.length} characters</span>
              </div>
              <textarea
                className={`form-control textarea-control ${errors.body ? "is-invalid" : ""}`}
                id="body"
                name="body"
                rows="8"
                placeholder="Write your story, technical breakdown, or analytical perspectives here..."
                value={formData.body}
                onChange={handleChange}
              />
              {errors.body && (
                <div className="error-message">
                  <FiAlertCircle /> {errors.body}
                </div>
              )}
            </div>

            {/* Cover Image Upload Field */}
            <div className="form-group">
              <label className="form-label">
                Featured Cover Image <span className="req">*</span>
              </label>

              {!formData.filePreview ? (
                <div
                  className={`upload-dropzone ${errors.file ? "dropzone-error" : ""}`}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <FiUploadCloud className="upload-icon" />
                  <p className="upload-main-text">
                    <strong>Click to upload</strong> or drag and drop an image
                  </p>
                  <p className="upload-hint">PNG, JPG, WEBP or GIF (Recommended: 1200x630px)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="preview-container">
                  <img
                    src={formData.filePreview}
                    alt="Cover preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="btn-remove-preview"
                    onClick={handleRemoveImage}
                    title="Remove Image"
                  >
                    <FiX /> Remove Cover
                  </button>
                </div>
              )}

              {errors.file && (
                <div className="error-message">
                  <FiAlertCircle /> {errors.file}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="form-action-row">
              <Link to="/" className="btn-cancel-form">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn-publish-submit"
                disabled={isSubmitting}
              >
                <FiCheck />
                <span>{isSubmitting ? "Publishing..." : "Publish Story"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
