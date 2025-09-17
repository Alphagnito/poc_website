import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from "recharts";
import "./AdminCluster.css";
import wholeData from "../../../jsons/sample_poc.json";

export default function AdminCluster() {
  const [selectedMSME, setSelectedMSME] = useState(null);
  const [msmeData, setMsmeData] = useState([]);

  const findMsmeData = () => {
    const adminFilters = JSON.parse(localStorage.getItem("adminFilters"));

    if (adminFilters) {
      const filtered = wholeData?.filter((d) => d?.district == adminFilters?.district && d?.sector == adminFilters?.industry);
      console.log(filtered);
      // Normalize data to match UI shape
      const normalized = filtered.map((d) => ({
        consumer_number: d.consumer_number,
        name: d.consumer_number.slice(0, 8), // fallback for name
        regNo: d.consumer_number.slice(0, 10), // dummy reg no
        industry: d.sector,
        location: d.district,
        sanctionedKVA: d.kwh_max,
        utilization: [d.kwh_min, d.kwh_mean, d.kwh_max],
        payments: [], // JSON doesn't have payments
        riskScore: Math.round(d.sickness_level * 100),
        riskLabel: d.sickness_label,
        plot_x: d.plot_x,
        plot_y: d.plot_y,
        color: d.sickness_label === "Healthy" ? "green" : "red",
      }));

      setMsmeData(normalized);
    }
  };

  useEffect(() => {
    findMsmeData();
  }, []);

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
            <ResponsiveContainer width="100%" height={447}>
              <ScatterChart>
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis type="number" dataKey="plot_x" name="t-SNE X" />
                <YAxis type="number" dataKey="plot_y" name="t-SNE Y" />
                {msmeData.map((msme) => (
                  <Scatter key={msme.consumer_number} name={msme.consumer_number} data={[msme]} fill={msme.color} onClick={() => setSelectedMSME(msme)} />
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
              {/* {selectedMSME.utilization?.length ? (
                <>
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
                </>
              ) : (
                <p>No utilization data available</p>
              )} */}

              {/* Payment History */}
              <h5 className="sub-heading">Payment History</h5>

              <div className="table-wrapper" style={{ height: "145px", overflowY: "auto" }}>
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Due Date</th>
                      <th>Paid Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-01-01</td>
                      <td>2025-01-05</td>
                    </tr>
                    <tr>
                      <td>2025-02-01</td>
                      <td>2025-02-03</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* {selectedMSME.payments?.length ? (
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
              ) : (
                <p>No payment data available</p>
              )} */}

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
