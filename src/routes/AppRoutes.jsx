
import Login from "@/components/Login/Login";
import AdminClusterPage from "@/pages/Admin/AdminClusterPage";
import AdminPage from "@/pages/Admin/AdminPage";
import AdminReportsPage from "@/pages/Admin/AdminReportsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/cluster" element={<AdminClusterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
