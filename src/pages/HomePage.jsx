import React, { useCallback, useContext, useState } from "react";
import { CreatedPost } from "../Components/CreatedPost";
import EditConfirmationModal from "../Components/EditConfirmationModal";
import ConfirmationModel from "../Components/ConfirmationModel";
import ExplorePost from "../Components/ExplorePost";
import { toggleTheame } from "../Context/TheameContextProvider";
import Footer from "../Components/Footer";
import { FiFeather } from "react-icons/fi";
import { toast } from "react-toastify";

// Default seed assets
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import post1 from "../assets/post1.jpg";

const STORAGE_KEY = "blogPosts";

const INITIAL_DEFAULT_POSTS = [
  {
    id: "post_101",
    title: "Mastering Modern Web Architecture: Principles & Performance",
    des: "Exploring the evolution of frontend rendering models, edge caching strategies, and responsive interfaces that deliver sub-second user interactions across global networks.",
    img: card1,
  },
  {
    id: "post_102",
    title: "The Art of User Experience: Designing Thoughtful Interfaces",
    des: "Why micro-interactions, accessible color contrast ratios, and deliberate typographic rhythm matter more than ever in transforming casual visitors into devoted advocates.",
    img: card2,
  },
  {
    id: "post_103",
    title: "Building Scalable Cloud Applications in 2026",
    des: "A deep dive into distributed systems, zero-trust security postures, and resilient deployment pipelines built to handle massive spikes in global readership.",
    img: post1,
  },
];

// Load posts from LocalStorage
const loadBlogPosts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    // Seed default posts only when storage has never been initialized.
    if (stored === null) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(INITIAL_DEFAULT_POSTS)
      );

      return INITIAL_DEFAULT_POSTS;
    }

    const parsed = JSON.parse(stored);

    // An empty array is valid. Do not restore deleted default posts.
    if (Array.isArray(parsed)) {
      return parsed;
    }

    throw new Error("Invalid blog posts data");
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return INITIAL_DEFAULT_POSTS;
  }
};

function HomePage() {
  const { mode } = useContext(toggleTheame);

  const [blogPostData, setBlogPostData] = useState(loadBlogPosts);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Save posts safely before updating the UI.
  const savePosts = (updatedPosts) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedPosts)
      );

      setBlogPostData(updatedPosts);
      return true;
    } catch (error) {
      console.error("Error saving blog posts:", error);
      toast.error(
        "Could not save changes. Browser storage may be full."
      );
      return false;
    }
  };

  // Open edit modal
  const openEditModal = (id) => {
    const postToEdit = blogPostData.find(
      (post) => String(post.id) === String(id)
    );

    if (postToEdit) {
      setSelectedPost(postToEdit);
      setShowEditModal(true);
    }
  };

  // Update existing post
  const updatePost = (updatedPost) => {
    const updatedPosts = blogPostData.map((post) =>
      String(post.id) === String(updatedPost.id)
        ? updatedPost
        : post
    );

    if (savePosts(updatedPosts)) {
      setShowEditModal(false);
      setSelectedPost(null);
      toast.success("Post updated successfully");
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = useCallback((id) => {
    setSelectedPostId(id);
    setShowDeleteModal(true);
  }, []);

  // Delete post after confirmation
  const confirmDelete = () => {
    const updatedPosts = blogPostData.filter(
      (post) => String(post.id) !== String(selectedPostId)
    );

    if (savePosts(updatedPosts)) {
      setShowDeleteModal(false);
      setSelectedPostId(null);
      toast.success("Post deleted successfully");
    }
  };

  return (
    <div
      className={`home-page-container ${
        mode === "light" ? "home-light" : "home-dark"
      }`}
    >
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <FiFeather className="hero-badge-icon" />
            <span>Welcome to BlogPost Hub</span>
          </div>

          <h1 className="hero-title">
            Where Ideas, Stories & Perspectives{" "}
            <span className="gradient-text">Come Alive</span>
          </h1>

          <p className="hero-subtitle">
            Explore insightful journalism, technical tutorials, and
            creative stories curated for curious minds and modern
            developers.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Curated Articles</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Active Readers</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Real-time Feed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Created Posts Section */}
      <CreatedPost
        blogPostData={blogPostData}
        onDelete={openDeleteModal}
        onEdit={openEditModal}
      />

      {/* Explore Posts Section */}
      <ExplorePost />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModel
          title="Delete Post?"
          desc="Are you sure you want to delete this story? This will permanently remove it from the platform."
          confirmBtnText="Delete"
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPostId(null);
          }}
        />
      )}

      {/* Edit Confirmation Modal */}
      {showEditModal && selectedPost && (
        <EditConfirmationModal
          key={selectedPost.id}
          title="Edit Story"
          post={selectedPost}
          onUpdate={updatePost}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPost(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
