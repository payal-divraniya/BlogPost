import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { BsMoonStarsFill } from "react-icons/bs";
import { useContext, useState } from "react";
import LogoutModel from "../Components/LogoutModel";
import { toggleTheame } from "../Context/TheameContextProvider";
import { useAuth } from "../Context/AuthContext";
import { LuSunMoon } from "react-icons/lu";
import { FiMenu, FiX, FiPlusCircle, FiHome, FiLogOut, FiLogIn, FiUser, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

export function Navbar() {
  const navigate = useNavigate();
  const { toggleMode, mode } = useContext(toggleTheame);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [logoutModel, setLogOutModel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogOutModel(false);
    setMobileMenuOpen(false);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const handleOpenModal = () => {
    setLogOutModel(true);
    setMobileMenuOpen(false);
  };

  const handleCancelModal = () => {
    setLogOutModel(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {logoutModel && (
        <LogoutModel
          handleLogout={handleLogout}
          handlecancleModel={handleCancelModal}
        />
      )}

      <header className={`navbar-wrapper ${mode === "light" ? "navbar-light-bg" : "navbar-dark-bg"}`}>
        <nav className={`navbar-container ${mode === "light" ? "navbar-light" : "navbar-dark"}`}>
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-logo-icon">
              <span>B</span>
            </div>
            <div className="brand-text">
              <span className="brand-name">BlogPost</span>
              <span className="brand-tag">HUB</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active-link" : ""}`
                }
              >
                <FiHome className="nav-icon" />
                <span>Home</span>
              </NavLink>
            </li>

            {/* Admin Only: New Post */}
            {isAuthenticated && isAdmin && (
              <li>
                <NavLink
                  to="/new-post"
                  className={({ isActive }) =>
                    `nav-link-item ${isActive ? "active-link" : ""}`
                  }
                >
                  <FiPlusCircle className="nav-icon" />
                  <span>New Post</span>
                </NavLink>
              </li>
            )}
          </ul>

          {/* Navbar Right (User info, theme toggle, auth button) */}
          <div className="navbar-right">
            {/* Dark / Light Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleMode}
              title={`Switch to ${mode === "light" ? "Dark" : "Light"} mode`}
              aria-label="Toggle theme"
            >
              {mode === "light" ? (
                <BsMoonStarsFill className="theme-icon moon-icon" />
              ) : (
                <LuSunMoon className="theme-icon sun-icon" />
              )}
              <span className="theme-label">{mode === "light" ? "Dark" : "Light"}</span>
            </button>

            {/* Auth Actions & User Pill */}
            {isAuthenticated ? (
              <div className="user-nav-group">
                <div className={`user-badge ${isAdmin ? "badge-admin" : "badge-user"}`}>
                  {isAdmin ? (
                    <FiShield className="role-icon" />
                  ) : (
                    <FiUser className="role-icon" />
                  )}
                  <div className="user-details">
                    <span className="user-role-label">
                      {isAdmin ? "Admin" : "User"}
                    </span>
                    {user?.mobileNumber && (
                      <span className="user-phone">
                        {user.mobileNumber.slice(0, 3)}...{user.mobileNumber.slice(-3)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="nav-btn logout-btn"
                  onClick={handleOpenModal}
                  title="Log out of your account"
                >
                  <FiLogOut className="btn-icon" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-btn login-btn" onClick={closeMobileMenu}>
                <FiLogIn className="btn-icon" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`mobile-menu-drawer ${mode === "light" ? "drawer-light" : "drawer-dark"}`}>
            <ul className="mobile-nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `mobile-link ${isActive ? "active-mobile-link" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  <FiHome className="nav-icon" />
                  <span>Home</span>
                </NavLink>
              </li>

              {isAuthenticated && isAdmin && (
                <li>
                  <NavLink
                    to="/new-post"
                    className={({ isActive }) =>
                      `mobile-link ${isActive ? "active-mobile-link" : ""}`
                    }
                    onClick={closeMobileMenu}
                  >
                    <FiPlusCircle className="nav-icon" />
                    <span>New Post</span>
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="mobile-menu-footer">
              {isAuthenticated ? (
                <>
                  <div className={`mobile-user-card ${isAdmin ? "badge-admin" : "badge-user"}`}>
                    <div className="user-avatar-circle">
                      {isAdmin ? <FiShield /> : <FiUser />}
                    </div>
                    <div>
                      <div className="mobile-user-name">
                        {user?.name || (isAdmin ? "Administrator" : "Standard User")}
                      </div>
                      <div className="mobile-user-sub">
                        Role: <strong>{isAdmin ? "Admin" : "User"}</strong>
                        {user?.mobileNumber && ` • ${user.mobileNumber}`}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mobile-action-btn logout-action"
                    onClick={handleOpenModal}
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="mobile-action-btn login-action"
                  onClick={closeMobileMenu}
                >
                  <FiLogIn />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
