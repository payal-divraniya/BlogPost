import React, { useContext } from "react";
import "../Styles/CreatedPost.css";
import { useNavigate } from "react-router-dom";
import { toggleTheame } from "../Context/TheameContextProvider";
import { useAuth } from "../Context/AuthContext";
import { FiTrash2, FiEdit3, FiArrowRight, FiPlusCircle, FiClock, FiCalendar, FiBookmark } from "react-icons/fi";

export function CreatedPost({ blogPostData = [], onDelete, onEdit }) {
  const nav = useNavigate();
  const { isAdmin } = useAuth();
  const { mode } = useContext(toggleTheame);

  const handleNavigate = (id) => {
    nav(`/postDetails/${id}`);
  };

  const calculateReadTime = (text = "") => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 150));
  };

  return (
    <section className={`created-post-section ${mode === "light" ? "section-light" : "section-dark"}`}>
      <div className="section-header">
        <div className="header-pill">
          <FiBookmark className="pill-icon" />
          <span>Curated Articles</span>
        </div>
        <h2 className="section-title">Featured Blog Stories</h2>
        <p className="section-subtitle">
          Insights, deep-dives, and perspectives written by our editorial team.
        </p>
      </div>

      <div className="posts-container">
        {(!blogPostData || blogPostData.length === 0) ? (
          <div className="empty-state-box">
            <div className="empty-icon-wrap">
              <FiPlusCircle className="empty-icon" />
            </div>
            <h3 className="empty-title">No Stories Published Yet</h3>
            <p className="empty-desc">
              {isAdmin
                ? "You haven't written any blog posts yet. Create your first engaging story for readers!"
                : "No editorial posts have been published yet. Please check back later or explore community posts below."}
            </p>
            {isAdmin && (
              <button
                type="button"
                className="btn-create-post"
                onClick={() => nav("/new-post")}
              >
                <FiPlusCircle />
                <span>Create New Story</span>
              </button>
            )}
          </div>
        ) : (
          <div className="posts-grid">
            {blogPostData.map((item, index) => {
              const readTime = calculateReadTime(item.des || "");
              return (
                <article className="post-card-item" key={item.id || index}>
                  <div className="card-media">
                    <img
                      src={item.img || "https://picsum.photos/600/400?random=" + index}
                      alt={item.title || "Post thumbnail"}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-badge">Editorial</div>
                  </div>

                  <div className="card-content">
                    <div className="card-meta">
                      <span className="meta-item">
                        <FiClock className="meta-icon" />
                        <span>{readTime} min read</span>
                      </span>
                      <span className="meta-item">
                        <FiCalendar className="meta-icon" />
                        <span>Story #{index + 1}</span>
                      </span>
                    </div>

                    <h3 className="card-title" title={item.title}>
                      {item.title}
                    </h3>

                    <p className="card-summary">
                      {item.des && item.des.length > 110
                        ? item.des.slice(0, 110) + "..."
                        : item.des || "Click below to read full details..."}
                    </p>

                    <div className="card-footer">
                      <div className="admin-actions">
                        {isAdmin && (
                          <>
                            <button
                              type="button"
                              className="action-btn-icon edit-action"
                              onClick={() => onEdit(item.id)}
                              title="Edit Story"
                              aria-label="Edit Story"
                            >
                              <FiEdit3 />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="action-btn-icon delete-action"
                              onClick={() => onDelete(item.id)}
                              title="Delete Story"
                              aria-label="Delete Story"
                            >
                              <FiTrash2 />
                              <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn-read-more"
                        onClick={() => handleNavigate(item.id)}
                      >
                        <span>Read Story</span>
                        <FiArrowRight className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default CreatedPost;
