import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import "./AdminNavbar.css";
import logo from "@/assets/glogo.png";

export default function AdminNavbar() {
  const [language, setLanguage] = useState("EN");
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "TA" : "EN"));
  };
  const role_id = localStorage.getItem("role_id");
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center px-4 py-2">
      <div className="nav-left d-flex gap-4 align-items-center">
        <div>
          <img src={logo} style={{ width: "60px" }} />
        </div>

        <div className="nav-left d-flex gap-3">
          <NavLink to="/admin/dashboard" className="nav-link-custom">
            Dashboard
          </NavLink>
          <NavLink to="/admin/cluster" className="nav-link-custom">
            Cluster Visualization
          </NavLink>
          <NavLink to="/admin/reports" className="nav-link-custom">
            Reports
          </NavLink>
        </div>
      </div>

      <div className="nav-right d-flex align-items-center gap-4">
        <div className="position-relative">
          <FaBell
            className="nav-icon"
            size={20}
            title="Notifications"
            onClick={() => {
              if (role_id == 1) {
                setShowDropdown((prev) => !prev);
              }
            }}
          />
          <span className="notification-badge"></span>
        </div>
        <button className="btn btn-outline-light btn-sm lang-toggle" onClick={toggleLanguage}>
          <MdLanguage className="me-1" /> {language !== "EN" ? "தமிழ்" : "English"}
        </button>
      </div>
    </nav>
  );
}
