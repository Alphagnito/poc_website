import React from "react";
import "./AdminReports.css";

const AdminReports = () => {
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

  return (
    <div className="reports-container marginx">
      <h2 className="reports-heading">📊 Admin Reports</h2>

      {/* Udyam Table */}
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

      {/* EB Table */}
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
    </div>
  );
};

export default AdminReports;
