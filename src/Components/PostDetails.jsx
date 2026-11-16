import React, { useState, useContext } from "react";
import "../Styles/PostDetails.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import EditConfirmationModel from "../Components/EditConfirmationModal";
import ConfirmationModel from "../Components/ConfirmationModel";
import { useAuth } from "../Context/AuthContext";
import { toggleTheame } from "../Context/TheameContextProvider";
import {
  FiArrowLeft,
  FiTrash2,
  FiEdit3,
  FiCalendar,
  FiClock,
  FiUser,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { toast } from "react-toastify";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { mode } = useContext(toggleTheame);

  const [blogPostData, setBlogPostData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("blogPosts")) || [];
    } catch {
      return [];
    }
  });

  const [currentPost, setCurrentPost] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("blogPosts")) || [];
      return stored.find((item) => String(item.id) === String(postId)) || null;
    } catch {
      return null;
    }
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);


  const confirmDelete = () => {
    const updated = blogPostData.filter((post) => String(post.id) !== String(postId));
    setBlogPostData(updated);
    localStorage.setItem("blogPosts", JSON.stringify(updated));
    setShowDeleteModal(false);

    toast.success("Post successfully deleted");
    navigate("/");
  };

  const handleUpdatePost = (updatedPost) => {
    const updated = blogPostData.map((post) =>
      String(post.id) === String(updatedPost.id) ? updatedPost : post
    );
    setBlogPostData(updated);
    setCurrentPost(updatedPost);
    localStorage.setItem("blogPosts", JSON.stringify(updated));
    setShowEditModal(false);

    toast.success("Post updated successfully");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Article link copied to clipboard!");
    }
  };

  if (!currentPost) {
    return (
      <div className={`post-not-found ${mode === "light" ? "post-light" : "post-dark"}`}>
        <div className="not-found-card">
          <h2>Story Not Found</h2>
          <p>The blog post you're looking for doesn't exist or may have been deleted.</p>
          <Link to="/" className="btn-return-home">
            <FiArrowLeft /> Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = (currentPost.des || "").trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 150));

  return (
    <>
      {showDeleteModal && (
        <ConfirmationModel
          title="Delete Story?"
          desc="Are you sure you want to delete this story? This action cannot be undone."
          confirmBtnText="Delete"
          onConfirm={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showEditModal && (
        <EditConfirmationModel
          key={currentPost.id}
          title="Edit Story"
          post={currentPost}
          onUpdate={handleUpdatePost}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <div className={`post-details-page ${mode === "light" ? "post-light" : "post-dark"}`}>
        <div className="post-details-wrapper">
          {/* Top Bar Navigation */}
          <div className="details-nav-bar">
            <button
              type="button"
              className="btn-back-nav"
              onClick={() => navigate("/")}
            >
              <FiArrowLeft />
              <span>Back to Stories</span>
            </button>

            <div className="details-nav-actions">
              <button
                type="button"
                className="btn-icon-secondary"
                onClick={handleShare}
                title="Share Story"
              >
                <FiShare2 />
                <span>Share</span>
              </button>

              {/* Admin Only Actions */}
              {isAdmin && (
                <>
                  <button
                    type="button"
                    className="btn-admin-action btn-edit"
                    onClick={() => setShowEditModal(true)}
                  >
                    <FiEdit3 />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="btn-admin-action btn-delete"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Article Header */}
          <header className="article-header">
            <div className="article-category-badge">
              <FiBookmark /> Featured Editorial
            </div>
            <h1 className="article-title">{currentPost.title}</h1>

            <div className="article-meta-row">
              <div className="author-info">
                <div className="author-avatar">
                  <FiUser />
                </div>
                <div>
                  <span className="author-name">Editorial Team</span>
                  <span className="author-role">Staff Writer</span>
                </div>
              </div>

              <div className="meta-stats">
                <span className="stat-pill">
                  <FiCalendar /> Published Recently
                </span>
                <span className="stat-pill">
                  <FiClock /> {readTime} min read
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {currentPost.img && (
            <div className="article-hero-media">
              <img
                src={currentPost.img}
                alt={currentPost.title}
                className="article-hero-image"
              />
            </div>
          )}

          {/* Article Body */}
          <main className="article-content">
            <p className="article-paragraph">{currentPost.des}</p>
          </main>

          {/* Footer Navigation */}
          <div className="article-bottom-bar">
            <Link to="/" className="btn-read-more-posts">
              <FiArrowLeft /> Explore More Stories
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
