
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "loginData";
const REGISTERED_USERS_KEY = "registeredUsers";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

// Frontend demo credentials only.
// This is not production-grade authentication.
const DEMO_ADMIN = {
  mobileNumber: "9876543210",
  otp: "1234",
};

const DEMO_USER = {
  mobileNumber: "9123456789",
  otp: "5678",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null"
      );

      if (
        saved?.role &&
        saved?.expiresAt &&
        Date.now() < saved.expiresAt
      ) {
        setUser(saved);
      } else if (saved) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.warn("Invalid session cleared:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({
    mobileNumber,
    role,
    otp,
    expectedOtp,
    name,
  }) => {
    try {
      const normalizedRole =
        String(role).toLowerCase() === "admin"
          ? "admin"
          : "user";

      if (!/^\d{10}$/.test(mobileNumber || "")) {
        return {
          success: false,
          message: "Please enter a valid 10-digit mobile number.",
        };
      }

      if (normalizedRole === "admin") {
        if (
          mobileNumber !== DEMO_ADMIN.mobileNumber ||
          otp !== DEMO_ADMIN.otp
        ) {
          return {
            success: false,
            message: "Invalid admin demo credentials.",
          };
        }
      } else {
        if (!otp || !expectedOtp || otp !== expectedOtp) {
          return {
            success: false,
            message: "OTP verification failed.",
          };
        }
      }

      const session = {
        id: `usr_${Date.now()}`,
        mobileNumber,
        role: normalizedRole,
        token: `local_${Date.now()}`,
        expiresAt: Date.now() + SESSION_DURATION_MS,
        createdAt: Date.now(),
        name:
          name ||
          (normalizedRole === "admin"
            ? "Administrator"
            : "Standard Reader"),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(session)
      );

      setUser(session);

      return {
        success: true,
        user: session,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const register = async ({
    mobileNumber,
    role,
    name,
  }) => {
    try {
      if (!/^\d{10}$/.test(mobileNumber || "")) {
        return {
          success: false,
          message: "Please enter a valid mobile number.",
        };
      }

      if (!name?.trim()) {
        return {
          success: false,
          message: "Full name is required.",
        };
      }

      if (String(role).toLowerCase() === "admin") {
        return {
          success: false,
          message:
            "Admin registration is disabled. Use the demo admin login.",
        };
      }

      const users = JSON.parse(
        localStorage.getItem(REGISTERED_USERS_KEY) || "[]"
      );

      const existingUser = users.find(
        (item) => item.mobileNumber === mobileNumber
      );

      if (existingUser) {
        return {
          success: false,
          message: "This mobile number is already registered.",
        };
      }

      const newUser = {
        id: `user_${Date.now()}`,
        mobileNumber,
        role: "user",
        name: name.trim(),
        registeredAt: Date.now(),
      };

      localStorage.setItem(
        REGISTERED_USERS_KEY,
        JSON.stringify([...users, newUser])
      );

      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const isAuthenticated = Boolean(user?.role);
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;
