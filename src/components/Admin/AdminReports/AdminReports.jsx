import React, { useState } from "react";
import "./AdminReports.css";
import wholeData from "../../../jsons/sample_poc.json";
const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("udyam");
  // Dummy data for Udyam Dataset
  const udyamData = [
    { id: 1, company: "ABC Industries", sector: "Manufacturing", employees: 120 },
    { id: 2, company: "XYZ Services", sector: "IT Services", employees: 45 },
    { id: 3, company: "PQR Textiles", sector: "Textiles", employees: 300 },
  ];

  // Dummy data for EB Dataset
  const ebData = [
    { id: 1, consumer: "Rajesh Kumar", tariff: "LT Domestic", units: 250 },
    { id: 2, consumer: "Sri Lakshmi Stores", tariff: "LT Commercial", units: 1240 },
    { id: 3, consumer: "Kannan Rice Mill", tariff: "HT Industrial", units: 5520 },
  ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  // Pagination logic
  const totalPages = Math.ceil(wholeData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = wholeData.slice(startIndex, endIndex);
  return (
    <div className="reports-container marginx">
      <h2 className="reports-heading">📊 Admin Reports</h2>
      {/* Tabs */}
      {/* <div className="tab-buttons">
        <button className={activeTab === "udyam" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("udyam")}>
          🏭 Udyam Dataset
        </button>
        <button className={activeTab === "eb" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("eb")}>
          ⚡ EB Dataset
        </button>
      </div> */}
      {/* <div>
        {activeTab === "udyam" ? (
          <div className="table-wrapper">
            <h4 className="table-title">🏭 Udyam Dataset (Companies)</h4>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>Employees</th>
                </tr>
              </thead>
              <tbody>
                {udyamData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.company}</td>
                    <td>{row.sector}</td>
                    <td>{row.employees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-wrapper mt-4">
            <h4 className="table-title">⚡ EB Dataset (Tariff)</h4>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Consumer</th>
                  <th>Tariff</th>
                  <th>Units Consumed</th>
                </tr>
              </thead>
              <tbody>
                {ebData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.consumer}</td>
                    <td>{row.tariff}</td>
                    <td>{row.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
      <div className="table-wrapper">
        {/* <h4 className="table-title">🏭 Udyam Dataset (Companies)</h4> */}
        <table className="custom-table">
          <thead>
            <tr>
              <th>Consumer No</th>
              <th>Sector</th>
              <th>District</th>
              <th>Connection Type</th>
              <th>Sickness Level (%)</th>
              <th>Sickness Label</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((row, i) => (
              <tr key={i}>
                <td>{row.consumer_number}</td>
                <td>{row.sector}</td>
                <td>{row.district}</td>
                <td>{row.connection_type}</td>
                <td>{(row.sickness_level * 100).toFixed(1)}%</td>
                <td>{row.sickness_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
