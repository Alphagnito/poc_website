import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "./AdminDash.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDash() {
  // ================== FILTERS ==================
  const [district, setDistrict] = useState("");
  const [industry, setIndustry] = useState("");
  const [kvaRange, setKvaRange] = useState("");
  const [connectionType, setConnectionType] = useState("");

  // Dummy filter options (replace with real data later)
  const districts = ["Chennai", "Madurai", "Coimbatore", "Salem", "Tirunelveli"];
  const industries = ["Textiles", "Automobile", "IT", "Food Processing", "Chemicals"];
  const kvaRanges = ["<50 KVA", "50-100 KVA", "100-500 KVA", ">500 KVA"];
  const connectionTypes = ["LT", "HT", "EHT"];

  // ================== METRICS ==================
  const totalMSMEs = 12500; // Example number

  // Donut chart: Healthy vs At-Risk vs Sick
  const healthData = {
    labels: ["Healthy", "At-Risk", "Sick"],
    datasets: [
      {
        label: "MSMEs",
        data: [8200, 3000, 1300],
        backgroundColor: ["#1cc88a", "#f6c23e", "#e74a3b"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const healthOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "MSME Health Status" },
    },
  };

  // Bar chart: Top 5 districts with Sick MSMEs
  const topDistricts = ["Chennai", "Madurai", "Salem", "Coimbatore", "Tirunelveli"];
  const sickCounts = [420, 310, 290, 270, 250];

  const barData = {
    labels: topDistricts,
    datasets: [
      {
        label: "Sick MSMEs",
        data: sickCounts,
        backgroundColor: "#e74a3b",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Top 5 Districts with Sick MSMEs" },
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 50 } },
    },
  };

  return (
    <div className="admin-dashboard marginx">
      <h2 className="title">MSME Dashboard</h2>

      {/* ================== FILTERS ================== */}
      <div className="row">
        <div className="filters row mb-4 col-8">
          <div className="col-md-3 mb-2 ">
            <label className="form-label">District</label>
            <select className="form-select" value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">All</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className="form-label">Industry Type</label>
            <select className="form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value="">All</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className="form-label">Sanctioned KVA Range</label>
            <select className="form-select" value={kvaRange} onChange={(e) => setKvaRange(e.target.value)}>
              <option value="">All</option>
              {kvaRanges.map((kva, i) => (
                <option key={i} value={kva}>
                  {kva}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className="form-label">Connection Type</label>
            <select className="form-select" value={connectionType} onChange={(e) => setConnectionType(e.target.value)}>
              <option value="">All</option>
              {connectionTypes.map((ct, i) => (
                <option key={i} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ================== METRICS ================== */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="dash_card dash_card_dark">
            <p className="mb-0">Total MSMEs Analyzed</p>
            <strong>{totalMSMEs.toLocaleString()}</strong>
            <div>
              <span className="app_badge">View</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================== CHARTS ================== */}
      <div className="row">
        <div className="col-md-6">
          <div className="chart-container" style={{ height: "400px" }}>
            <Doughnut data={healthData} options={healthOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container" style={{ height: "400px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
