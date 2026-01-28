import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api from "../../api";

export const AuthContext = createContext({
  isAuthenticated: false,
  username: "",
  setIsAuthenticated: () => {},
  setUsername: () => {},
  login: () => {},
  logout: () => {},
  getUsername: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Check JWT validity
  const checkAuth = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      setUsername("");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        logout(); // Token expired
      } else {
        setIsAuthenticated(true);
        getUsername();
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
    }
  };

  // Fetch username from backend
  const getUsername = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await api.get("/get_username/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(res.data.username);
    } catch (err) {
      console.error("Error fetching username:", err.message);
      logout();
    }
  };

  // Login and save tokens
  const login = async (username, password) => {
    try {
      const res = await api.post("/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setIsAuthenticated(true);
      getUsername();
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return { success: false, error: err.response?.data || err.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername("");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        setIsAuthenticated,
        setUsername,
        login,
        logout,
        getUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
