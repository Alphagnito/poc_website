import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from "recharts";
import "./AdminCluster.css";

// Dummy MSME data
const msmeData = [
  {
    id: 1,
    name: "ABC Textiles",
    regNo: "UDYAM-12345",
    industry: "Textile",
    location: "Tirupur, TN",
    sanctionedKVA: 120,
    utilization: [80, 90, 95, 100, 110, 120],
    payments: [
      { due: "2025-01-01", paid: "2025-01-05" },
      { due: "2025-02-01", paid: "2025-02-03" },
      { due: "2025-03-01", paid: "2025-03-12" },
    ],
    riskScore: 65,
    riskLabel: "At Risk",
    cluster: { x: 12, y: 40 },
    color: "orange",
  },
  {
    id: 2,
    name: "XYZ Metals",
    regNo: "UDYAM-67890",
    industry: "Metal Works",
    location: "Pune, MH",
    sanctionedKVA: 150,
    utilization: [70, 75, 80, 90, 100, 110],
    payments: [
      { due: "2025-01-01", paid: "2025-01-02" },
      { due: "2025-02-01", paid: "2025-02-01" },
      { due: "2025-03-01", paid: "2025-03-04" },
    ],
    riskScore: 85,
    riskLabel: "Healthy",
    cluster: { x: 50, y: 60 },
    color: "green",
  },
  {
    id: 3,
    name: "LMN Engineering",
    regNo: "UDYAM-24680",
    industry: "Engineering",
    location: "Noida, UP",
    sanctionedKVA: 200,
    utilization: [100, 110, 120, 140, 160, 190],
    payments: [
      { due: "2025-01-01", paid: "2025-01-20" },
      { due: "2025-02-01", paid: "2025-02-25" },
      { due: "2025-03-01", paid: "2025-03-30" },
    ],
    riskScore: 30,
    riskLabel: "Sick",
    cluster: { x: 80, y: 20 },
    color: "red",
  },
];

export default function AdminCluster() {
  const [selectedMSME, setSelectedMSME] = useState(null);

  const handleDownloadReport = () => {
    const blob = new Blob(["This is a dummy MSME auto-generated report for PoC."], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MSME_Report.pdf";
    link.click();
  };

  return (
    <div className="adminCluster-container marginx">
      <h2 className="adminCluster-heading">🏭 MSME Cluster Dashboard</h2>
      <div className="adminCluster-row">
        {/* Cluster Visualization */}
        <div className="adminCluster-col">
          <div className="adminCluster-card">
            <h3 className="section-title">Cluster Visualization</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis type="number" dataKey="x" name="t-SNE X" />
                <YAxis type="number" dataKey="y" name="t-SNE Y" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value, name, props) => [`${props.payload.name}\nKVA: ${props.payload.sanctionedKVA}\nRisk: ${props.payload.riskLabel}`, ""]} />
                {msmeData.map((msme) => (
                  <Scatter key={msme.id} name={msme.name} data={[{ ...msme.cluster, ...msme }]} fill={msme.color} onClick={() => setSelectedMSME(msme)} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detail View */}
        <div className="adminCluster-col">
          {selectedMSME ? (
            <div className="adminCluster-card fadeIn">
              <h3 className="section-title">MSME Detail View</h3>
              <h4 className="msme-name">{selectedMSME.name}</h4>
              <p className="msme-info">
                <strong>Udyam Reg No:</strong> {selectedMSME.regNo} <br />
                <strong>Industry:</strong> {selectedMSME.industry} <br />
                <strong>Location:</strong> {selectedMSME.location}
              </p>

              {/* Utilization Chart */}
              <h5 className="sub-heading">Energy Utilization</h5>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={selectedMSME.utilization.map((val, i) => ({
                    month: `M${i + 1}`,
                    utilized: val,
                    sanctioned: selectedMSME.sanctionedKVA,
                  }))}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <Line type="monotone" dataKey="utilized" stroke="#007bff" />
                  <Line type="monotone" dataKey="sanctioned" stroke="#dc3545" />
                </LineChart>
              </ResponsiveContainer>

              {/* Payment History */}
              <h5 className="sub-heading">Payment History</h5>
              <div className="table-wrapper">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Due Date</th>
                      <th>Paid Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMSME.payments.map((p, idx) => (
                      <tr key={idx}>
                        <td>{p.due}</td>
                        <td>{p.paid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Risk Info */}
              <h5 className="sub-heading">Risk Assessment</h5>
              <p>
                <strong>Risk Score:</strong> {selectedMSME.riskScore} <br />
                <strong>Status:</strong> <span className={`risk-badge ${selectedMSME.riskLabel.toLowerCase().replace(" ", "-")}`}>{selectedMSME.riskLabel}</span>
              </p>

              {/* Download */}
              <button className="primary-btn" onClick={handleDownloadReport}>
                📄 Download Report
              </button>
            </div>
          ) : (
            <div className="adminCluster-card placeholder">
              <p>Select an MSME from the cluster to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
