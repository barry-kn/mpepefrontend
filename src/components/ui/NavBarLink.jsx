import React, { useContext } from "react"; // ✅ single, correct import
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const NavBarLink = () => {
  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("access");
    setIsAuthenticated(false);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {isAuthenticated ? (
        <>
          {/* --- Profile Link --- */}
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              {`Hi ${username}`}
            </NavLink>
          </li>

          {/* --- Logout Link --- */}
          <li className="nav-item" onClick={logout}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {/* --- Login Link --- */}
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              Login
            </NavLink>
          </li>

          {/* --- Register Link --- */}
          <li className="nav-item">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLink;
