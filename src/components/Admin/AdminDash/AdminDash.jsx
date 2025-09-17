import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { industries, districts } from "../data.js";
import "./AdminDash.css";
import { useNavigate } from "react-router-dom";
import wholeData from "../../../jsons/sample_poc.json";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDash() {
  const [formData, setFormData] = useState({
    district: "",
    industry: "",
    kva_range: "All",
    connection_type: "All",
  });
  const n = useNavigate();
  // Donut chart: Healthy vs At-Risk vs Sick
  const healthData = {
    labels: ["Healthy", "At-Risk", "Sick"],
    datasets: [
      {
        label: "MSMEs",
        data: [wholeData?.filter((d) => d?.sickness_label == "Healthy")?.length, wholeData?.filter((d) => d?.sickness_label == "Sick")?.length, wholeData?.filter((d) => d?.sickness_label == "At-Risk")?.length],
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
  // Step 1: Count Sick units per district
  const districtCounts = wholeData.reduce((acc, item) => {
    if (item.sickness_label === "Sick") {
      acc[item.district] = (acc[item.district] || 0) + 1;
    }
    return acc;
  }, {});

  // Step 2: Convert to array, sort by count (descending), take top 5
  const sortedDistricts = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([district, count]) => ({ district, count }));

  const barData = {
    labels: sortedDistricts.map((d) => d.district),
    datasets: [
      {
        label: "Sick MSMEs",
        data: sortedDistricts.map((d) => d.count),
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
  const stats = [
    { label: "Total MSMEs Analyzed", value: wholeData?.length },
    { label: "Total MSMEs Monitored", value: 8420 },
    {
      label: "Health Distribution (Healthy / Risk / Sick)",
      value: `${wholeData?.filter((d) => d?.sickness_label == "Healthy")?.length}/${wholeData?.filter((d) => d?.sickness_label == "At-Risk")?.length}/${wholeData?.filter((d) => d?.sickness_label == "Sick")?.length}`,
    },
    { label: "Total Energy Consumed (kWh)", value: "12,45,600" },
  ];
  // Step 1: Count Sick units per sector
  const sectorCounts = wholeData.reduce((acc, item) => {
    if (item.sickness_label === "Sick") {
      acc[item.sector] = (acc[item.sector] || 0) + 1;
    }
    return acc;
  }, {});

  // Step 2: Find sector with maximum Sick units
  let maxSector = "N/A";
  let maxCount = 0;
  Object.entries(sectorCounts).forEach(([sector, count]) => {
    if (count > maxCount) {
      maxSector = sector;
      maxCount = count;
    }
  });
  const stats2 = [
    { label: "Total Revenue Collected (₹)", value: "₹ 78.3 Cr" },
    { label: "Average Payment Delay (days)", value: 14 },
    { label: "% On-Time Payments", value: "72%" },
    { label: "Fixed Charge Burden (%)", value: "18%" },
    { label: "District with Max Sick Units", value: sortedDistricts[0]?.district || "N/A" },
    { label: "Sector with Max Sick Units", value: maxSector },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("adminFilters", JSON.stringify(formData));
    n("/admin/cluster");
  };
  return (
    <div className="admin-dashboard marginx">
      <h2 className="title">MSME Dashboard</h2>

      {/* ================== FILTERS ================== */}
      <form className="row" onSubmit={handleSubmit}>
        <div className="filters row mb-4 col-12">
          <div className="col-md-2 mb-2 px-0">
            <label className="form-label">District</label>
            <select className="form-select" onChange={handleChange} name="district" required>
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
            <select className="form-select" onChange={handleChange} name="industry" required>
              <option value="">All</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind.length > 30 ? ind.slice(0, 30) + "..." : ind}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className="form-label">Sanctioned KVA Range</label>
            <select className="form-select" onChange={handleChange} name="kva_range" disabled>
              <option value="">All</option>
              {/* {kvaRanges.map((kva, i) => (
                <option key={i} value={kva}>
                  {kva}
                </option>
              ))} */}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className="form-label">Connection Type</label>
            <select className="form-select" onChange={handleChange} name="connection_type" disabled>
              <option value="">All</option>
              {/* {connectionTypes.map((ct, i) => (
                <option key={i} value={ct}>
                  {ct}
                </option>
              ))} */}
            </select>
          </div>
          <div className="col-md-1 mb-2 mt-auto pe-0">
            <button className="btn btn-success w-100" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* ================== METRICS ================== */}
      <div className="row mb-4">
        <div className="dash-main-row1 row p-0 mx-auto">
          <div className="dash_card_container col-12  mb-2 row mx-auto p-0">
            {stats?.map((d, i) => (
              <div className="col-md-3 p-0" key={i}>
                <div className={i != stats?.length - 1 ? "dash_card m-2" : "dash_card dash_card_dark m-2"}>
                  <p className="mb-0">{d?.label}</p>
                  <strong>{d?.value}</strong>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <span className="app_badge">View</span>
                    </div>
                    {/* <IoIosArrowForward /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================== CHARTS ================== */}
      <div className="row">
        <div className="col-md-4">
          {stats2?.map((d, i) => (
            <div className={i != stats2?.length - 1 ? "dash_card m-2" : "dash_card dash_card_dark m-2"} key={i} style={{ height: "auto", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <p className={i != stats2?.length - 1 ? "mb-0 text-dark" : "mb-0"} style={{ fontWeight: "500" }}>
                {d?.label}
              </p>
              <div>
                <span className={`status pending`}>{d.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-8">
          <div className="chart-container" style={{ height: "94.45%" }}>
            <Doughnut data={healthData} options={healthOptions} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="chart-container" style={{ height: "100%" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
