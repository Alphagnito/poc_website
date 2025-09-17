import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import "./Navbar.css";
import AppModal from "../Modal/AppModal";
import ScheduleMeetModal from "../Modal/ScheduleMeetModal/ScheduleMeetModal";
import { useBookingStore } from "@/stores/useBookingStore";
import logo from "@/assets/glogo.png";
export default function Navbar() {
  const [language, setLanguage] = useState("EN");
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { bookings } = useBookingStore((s) => s);
  const aadhar = localStorage.getItem("aadharOrEMMIS");
  const userBooking = bookings.find((b) => b.booked_by === aadhar);
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "TA" : "EN"));
  };
  const role_id = localStorage.getItem("role_id");
  return (
    <>
      {" "}
      <nav className="navbar-custom px-4 py-2">
        <div className="d-flex justify-content-center align-items-center gap-3">
          {" "}
          <div>
            <img src={logo} style={{ width: "60px" }} />
          </div>{" "}
          {role_id == 1 && (
            <div className="nav-left d-flex gap-4">
              <NavLink to="/student/profile" className="nav-link-custom">
                Profile
              </NavLink>
              <NavLink to="/student/benefits" className="nav-link-custom">
                Benefits
              </NavLink>
              <NavLink to="/student/courses" className="nav-link-custom">
                Recommended Courses
              </NavLink>
              <NavLink to="/student/colleges" className="nav-link-custom">
                Recommended Colleges
              </NavLink>
              <NavLink
                to="/"
                className="nav-link-custom"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Schedule a Call
              </NavLink>
            </div>
          )}
          {role_id == 2 && (
            <div className="nav-left d-flex gap-4">
              <NavLink to="/counselor/view-bookings" className="nav-link-custom">
                View Bookings
              </NavLink>
            </div>
          )}
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
            {showDropdown && role_id == 1 && (
              <div className="dropdown-menu-custom">
                {userBooking ? (
                  <>
                    {userBooking?.meeting == "start" ? (
                      <div className="mt-2">
                        <strong>Booked Meeting</strong>
                        <div>
                          Counsellor: <strong>{userBooking.counselor}</strong>
                        </div>
                        <div>
                          Slot: <strong>{userBooking.slot}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <h6>Meeting Ended</h6>
                        <div>
                          Counsellor: <strong>{userBooking.counselor}</strong>
                        </div>
                        <div>
                          Slot: <strong>{userBooking.slot}</strong>
                        </div>
                        <NavLink to="/student/reports" className="btn btn-danger w-100 mt-2">
                          Reports
                        </NavLink>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-muted mt-2">No meeting booked</div>
                )}
              </div>
            )}
          </div>
          <button className="btn btn-outline-light btn-sm lang-toggle" onClick={toggleLanguage}>
            <MdLanguage className="me-1" /> {language !== "EN" ? "தமிழ்" : "English"}
          </button>
        </div>
      </nav>{" "}
      <AppModal
        show={open}
        handleClose={() => {
          setOpen(false);
        }}
        title="Schedule Meet"
        size="modal-md"
      >
        <ScheduleMeetModal title="Schedule Meet" setOpen={setOpen} />
      </AppModal>
    </>
  );
}
