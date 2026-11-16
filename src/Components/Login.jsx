
import React, { useState, useEffect, useContext } from "react";
import "../Styles/login.css";
import image from "../assets/image.png";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toggleTheame } from "../Context/TheameContextProvider";
import {
  FiPhone,
  FiShield,
  FiUser,
  FiKey,
  FiArrowRight,
  FiCheckCircle,
  FiHome,
  FiMoon,
  FiSun,
} from "react-icons/fi";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { login, register, isAuthenticated } = useAuth();
  const { mode, toggleMode } = useContext(toggleTheame);

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      const target = location.state?.from?.pathname || "/";
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  // Mobile number validation
  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);

    setMobileNumber(val);
    setGeneratedOtp("");
    setOtp("");
    setOtpSent(false);

    if (mobileError) setMobileError("");
    if (otpError) setOtpError("");
  };

  // Name input
  const handleNameChange = (e) => {
    setName(e.target.value);

    if (nameError) {
      setNameError("");
    }
  };

  // Role selection
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setGeneratedOtp("");
    setOtp("");
    setOtpSent(false);

    if (roleError) setRoleError("");
    if (otpError) setOtpError("");
  };

  // OTP input
  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);

    setOtp(val);

    if (otpError) {
      setOtpError("");
    }
  };

  // Generate demo OTP
  const handleGenerateOtp = async () => {
    if (!mobileNumber) {
      setMobileError("Please enter your mobile number first");
      return;
    }

    if (mobileNumber.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }

    if (!role) {
      setRoleError("Please select a role before generating OTP");
      return;
    }

    let otpValue;

    if (role === "admin") {
      if (mobileNumber !== "9876543210") {
        setOtpError("Invalid admin demo mobile number.");
        return;
      }

      otpValue = "1234";
    } else if (mobileNumber === "9123456789") {
      otpValue = "5678";
    } else {
      otpValue = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
    }

    setGeneratedOtp(otpValue);
    setOtpSent(true);
    setOtp(otpValue);
    setOtpError("");

    toast.info(`Demo verification OTP: ${otpValue}`, {
      autoClose: 10000,
    });
  };

  // Auto-fill OTP
  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setOtp(generatedOtp);
    }
  };

  // Login and registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setMobileError("");
    setNameError("");
    setRoleError("");
    setOtpError("");

    if (!mobileNumber) {
      setMobileError("Mobile number is required");
      hasError = true;
    } else if (mobileNumber.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      hasError = true;
    }

    if (activeTab === "register" && !name.trim()) {
      setNameError("Full name is required");
      hasError = true;
    }

    if (!role) {
      setRoleError("Please select an account role");
      hasError = true;
    }

    if (!otpSent || !generatedOtp) {
      setOtpError("Please generate OTP first");
      hasError = true;
    } else if (otp !== generatedOtp) {
      setOtpError("Invalid OTP. Please check the code.");
      hasError = true;
    }

    if (hasError) {
      toast.error("Please resolve the validation errors above.");
      return;
    }

    // Admin registration is not allowed
    if (activeTab === "register") {
      if (role === "admin") {
        toast.error(
          "Admin registration is disabled. Use demo admin login."
        );
        return;
      }

      const registerResult = await register({
        mobileNumber,
        role,
        name,
      });

      if (!registerResult.success) {
        toast.error(
          registerResult.message || "Registration failed."
        );
        return;
      }
    }

    // Authenticate user
    const result = await login({
      mobileNumber,
      role,
      otp,
      expectedOtp: generatedOtp,
      name: name.trim() || undefined,
    });

    if (result?.success) {
      toast.success(
        activeTab === "register"
          ? "Account registered successfully!"
          : "Logged in successfully!"
      );

      const redirectTarget =
        location.state?.from?.pathname || "/";

      navigate(redirectTarget, { replace: true });
    } else {
      toast.error(
        result?.message || "Authentication failed. Please try again."
      );
    }
  };

  return (
    <div
      className={`login-page-wrapper ${
        mode === "light" ? "page-light" : "page-dark"
      }`}
    >
      {/* Top Floating Controls */}
      <div className="login-top-bar">
        <Link to="/" className="top-home-link">
          <FiHome />
          <span>Home</span>
        </Link>

        <button
          type="button"
          className="top-theme-btn"
          onClick={toggleMode}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {mode === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </div>

      <div className="login-card-container">
        {/* Left Visual Panel */}
        <div className="login-visual-panel">
          <div className="brand-badge-row">
            <div className="brand-dot-icon">B</div>
            <span className="brand-badge-name">BlogPost</span>
          </div>

          <div className="visual-hero-center">
            <img
              src={image}
              alt="BlogPost Showcase"
              className="visual-hero-img"
            />

            <h2 className="visual-hero-heading">
              Read, Write & Inspire
            </h2>

            <p className="visual-hero-sub">
              Join thousands of technical writers, developers,
              and thinkers sharing deep perspectives.
            </p>
          </div>

          <div className="visual-footer-stats">
            <div className="stat-pill-item">
              <FiCheckCircle className="stat-pill-icon" />
              <span>Role-Based Permissions</span>
            </div>

            <div className="stat-pill-item">
              <FiCheckCircle className="stat-pill-icon" />
              <span>Demo Session Management</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="login-form-panel">
          <div className="panel-tab-switcher">
            <button
              type="button"
              className={`tab-btn ${
                activeTab === "login" ? "active-tab" : ""
              }`}
              onClick={() => {
                setActiveTab("login");
                setOtpError("");
                setNameError("");
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              className={`tab-btn ${
                activeTab === "register" ? "active-tab" : ""
              }`}
              onClick={() => {
                setActiveTab("register");
                setOtpError("");
                setNameError("");
                setGeneratedOtp("");
                setOtp("");
                setOtpSent(false);
              }}
            >
              Register
            </button>
          </div>

          <div className="form-header-text">
            <h1 className="header-greeting">
              {activeTab === "login"
                ? "Welcome Back"
                : "Create Account"}
            </h1>

            <p className="header-sub">
              {activeTab === "login"
                ? "Enter your mobile number and role to continue"
                : "Register with your credentials to start reading and writing"}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Full Name for Register */}
            {activeTab === "register" && (
              <div className="auth-field-group">
                <label className="auth-label">
                  Full Name
                </label>

                <div className="auth-input-box">
                  <FiUser className="input-icon" />

                  <input
                    type="text"
                    name="name"
                    className={`auth-input ${
                      nameError ? "input-invalid" : ""
                    }`}
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>

                {nameError && (
                  <p className="field-error">{nameError}</p>
                )}
              </div>
            )}

            {/* Mobile Number */}
            <div className="auth-field-group">
              <label className="auth-label">
                Mobile Number
              </label>

              <div className="auth-input-box">
                <FiPhone className="input-icon" />

                <span className="country-prefix">+91</span>

                <input
                  type="tel"
                  name="mobileNumber"
                  className={`auth-input phone-input ${
                    mobileError ? "input-invalid" : ""
                  }`}
                  placeholder="10-digit mobile number"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  maxLength={10}
                />
              </div>

              {mobileError && (
                <p className="field-error">{mobileError}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="auth-field-group">
              <label className="auth-label">
                Account Role & Privileges
              </label>

              <div className="auth-input-box">
                <FiShield className="input-icon" />

                <select
                  name="role"
                  className={`auth-select ${
                    roleError ? "input-invalid" : ""
                  }`}
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select a Role</option>
                  <option value="user">
                    User (Reader - Browse & Read Stories)
                  </option>
                  <option value="admin">
                    Admin (Editor - Create, Edit & Delete Stories)
                  </option>
                </select>
              </div>

              {roleError && (
                <p className="field-error">{roleError}</p>
              )}
            </div>

            {/* OTP Generation Row */}
            <div className="otp-action-row">
              <button
                type="button"
                className="btn-generate-otp"
                onClick={handleGenerateOtp}
                disabled={
                  !mobileNumber ||
                  mobileNumber.length !== 10 ||
                  !role
                }
              >
                {otpSent ? "Resend OTP" : "Generate OTP"}
              </button>

              {generatedOtp && (
                <div
                  className="otp-quick-fill-hint"
                  onClick={handleAutoFillOtp}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleAutoFillOtp();
                    }
                  }}
                >
                  <span>
                    OTP: <strong>{generatedOtp}</strong>{" "}
                    (Click to auto-fill)
                  </span>
                </div>
              )}
            </div>

            {/* OTP Input */}
            <div className="auth-field-group">
              <label className="auth-label">
                4-Digit Verification Code
              </label>

              <div className="auth-input-box">
                <FiKey className="input-icon" />

                <input
                  type="text"
                  name="otp"
                  className={`auth-input ${
                    otpError ? "input-invalid" : ""
                  }`}
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={4}
                />
              </div>

              {otpError && (
                <p className="field-error">{otpError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-auth-submit"
            >
              <span>
                {activeTab === "login"
                  ? "Sign In to Account"
                  : "Complete Registration"}
              </span>

              <FiArrowRight className="btn-arrow" />
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="auth-demo-helper">
            <span className="demo-title">
              Quick Demo Login:
            </span>

            <div className="demo-tags">
              {/* Admin Demo */}
              <button
                type="button"
                className="demo-tag admin-demo"
                onClick={() => {
                  setActiveTab("login");
                  setMobileNumber("9876543210");
                  setRole("admin");
                  setGeneratedOtp("1234");
                  setOtp("1234");
                  setOtpSent(true);

                  setMobileError("");
                  setRoleError("");
                  setOtpError("");
                  setNameError("");

                  toast.info(
                    "Admin demo credentials filled."
                  );
                }}
              >
                Fill Admin (Editor)
              </button>

              {/* User Demo */}
              <button
                type="button"
                className="demo-tag user-demo"
                onClick={() => {
                  setActiveTab("login");
                  setMobileNumber("9123456789");
                  setRole("user");
                  setGeneratedOtp("5678");
                  setOtp("5678");
                  setOtpSent(true);

                  setMobileError("");
                  setRoleError("");
                  setOtpError("");
                  setNameError("");

                  toast.info(
                    "User demo credentials filled."
                  );
                }}
              >
                Fill User (Reader)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
