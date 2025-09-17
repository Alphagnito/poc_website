import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/glogo.png";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const [identifier, setIdentifier] = useState(""); // password / register ID
  const n = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) {
      alert("Please select a role to continue");
      return;
    }
    if (!identifier.trim()) {
      alert("Please enter Password / Register ID");
      return;
    }

    // Mock login - save details
    localStorage.setItem("role", selectedRole);
    localStorage.setItem("identifier", identifier);

    // Mock role_id mapping
    let roleId = 0;
    if (selectedRole === "Govt. Official") roleId = 1;
    if (selectedRole === "District Officer") roleId = 2;
    if (selectedRole === "Analyst") roleId = 3;

    localStorage.setItem("role_id", roleId);

    alert(`Logged in as ${selectedRole} (${identifier})`);

    // Redirect (common or role-based)
    n("/admin/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="d-flex mx-auto pt-3">
              <img src={logo} style={{ width: "100px" }} alt="logo" />
            </div>
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>

              {/* Role Selection */}
              <div className="mb-3">
                <label className="form-label">Select Role</label>
                <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="">-- Choose Role --</option>
                  <option value="Govt. Official">Govt. Official</option>
                  <option value="District Officer">District Officer</option>
                  <option value="Analyst">Analyst</option>
                </select>
              </div>

              {/* Identifier Input */}
              <div className="mb-3">
                <label className="form-label">Password / Register ID</label>
                <input type="text" className="form-control" placeholder="Enter Password or Register ID" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>

              <p className="text-muted mt-3 text-center">*This is a mock login for demo purposes only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
