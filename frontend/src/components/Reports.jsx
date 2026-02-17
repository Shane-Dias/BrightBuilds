import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

const Reports = () => {
  const chartRef = useRef(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/analytics/summary`;
      console.log("Fetching analytics from:", url);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          const text = await response.text();
          errorMsg = text || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (!data.success) {
        throw new Error(data.message || "Server returned success: false");
      }

      if (!data.data) {
        throw new Error("No data returned from server");
      }

      setSummary(data.data);
    } catch (err) {
      console.error("Analytics error", err);
      setError(err.message || "Failed to load analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const downloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const canvas = await html2canvas(chartRef.current);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "admin-dashboard-analytics.png";
      link.click();
    } catch (err) {
      console.error("Error downloading chart:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Download */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h4 className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
          📊 Admin Analytics
        </h4>
        <button
          onClick={downloadChart}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
          }}
        >
          <Download size={18} />
          <span className="text-sm">Download</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div
          className="rounded-xl p-8 text-center"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <p style={{ color: "var(--text-secondary)" }}>Loading analytics...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="rounded-xl p-6 border space-y-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--error)",
          }}
        >
          <div>
            <p style={{ color: "var(--error)", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Error Loading Analytics
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", wordBreak: "break-word" }}>
              {error}
            </p>
          </div>
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Charts Container */}
      {!loading && !error && summary && (
        <div ref={chartRef} className="space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Projects",
                value: summary.totals.projects,
              },
              {
                label: "Pending",
                value:
                  summary.projectsByStatus.find((item) => item.status === "pending")
                    ?.count || 0,
              },
              {
                label: "Approved",
                value:
                  summary.projectsByStatus.find((item) => item.status === "approved")
                    ?.count || 0,
              },
              {
                label: "Total Users",
                value: summary.totals.users,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projects by Month */}
            <div
              className="rounded-xl p-5 border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
              }}
            >
              <h5
                className="text-lg font-medium mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Projects Created (Last 6 Months)
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={summary.projectsByMonth}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-primary)"
                  />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Projects"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    dot={{ fill: "var(--accent-primary)", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Users by Role */}
            <div
              className="rounded-xl p-5 border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
              }}
            >
              <h5
                className="text-lg font-medium mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Users by Role
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={summary.usersByRole}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-primary)"
                  />
                  <XAxis dataKey="role" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Users"
                    fill="var(--amber-primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
