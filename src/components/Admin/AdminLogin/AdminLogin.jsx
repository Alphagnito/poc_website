import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/glogo.png";
function AdminLogin() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    alert(`Login successful!`);
    navigate("/admin/dashboard");
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="d-flex mx-auto pb-3 justify-content-center">
          <img src={logo} style={{ width: "100px" }} />
        </div>
        <h2 className="login-title">Admin Login</h2>

        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
