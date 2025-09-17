import AdminDash from "@/components/Admin/AdminDash/AdminDash";
import AdminNavbar from "@/components/Admin/AdminNavbar/AdminNavbar";
import React from "react";

function AdminPage() {
  return (
    <div>
      <AdminNavbar />
      <AdminDash />
    </div>
  );
}

export default AdminPage;
