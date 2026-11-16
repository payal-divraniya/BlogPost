import React, { useContext } from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";
import { toggleTheame } from "../Context/TheameContextProvider";
import { useAuth } from "../Context/AuthContext";
import { FiFeather, FiHeart, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

function Footer() {
  const { mode } = useContext(toggleTheame);
  const { isAuthenticated, isAdmin } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`site-footer ${mode === "light" ? "footer-light" : "footer-dark"}`}>
      <div className="footer-top-grid">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="footer-logo-badge">
              <FiFeather />
            </div>
            <span className="footer-logo-text">BlogPost</span>
          </div>
          <p className="footer-tagline">
            A premium blogging and publishing platform designed for writers, thinkers, and tech innovators.
          </p>
          <div className="footer-social-icons">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link">
              <FiGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
              <FiLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Stories</Link></li>
            {isAuthenticated && isAdmin && (
              <li><Link to="/new-post">Create Post (Admin)</Link></li>
            )}
            {!isAuthenticated ? (
              <li><Link to="/login">Sign In / Register</Link></li>
            ) : null}
            <li><Link to="/ProductList">Product Showcase</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Categories</h4>
          <ul className="footer-links">
            <li><a href="#explore">Technology</a></li>
            <li><a href="#explore">Architecture</a></li>
            <li><a href="#explore">UI/UX Design</a></li>
            <li><a href="#explore">Cloud & DevOps</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Platform</h4>
          <p className="platform-meta">
            Session Security • Role-Based Access Control • Dark/Light Mode Engine
          </p>
          <div className="secure-badge">
            <span className="dot" /> Encrypted Local Sessions
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright-text">
          © {currentYear} All rights reserved <span>BlogPost</span>. Crafted with <FiHeart className="heart-icon" /> for passionate readers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
