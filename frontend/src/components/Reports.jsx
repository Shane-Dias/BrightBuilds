import React, { useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { BsGraphUp } from "react-icons/bs";
import { GiPieChart } from "react-icons/gi";
// 🔹 Realistic Project Trends (Sample Data)
const projectTrends = [
    { month: "Jan", projects: 3 },
    { month: "Feb", projects: 2 },
    { month: "Mar", projects: 5 },
    { month: "Apr", projects: 8 },
    { month: "May", projects: 7 },
    { month: "Jun", projects: 12 },
    { month: "Jul", projects: 15 },
    { month: "Aug", projects: 19 },
    { month: "Sep", projects: 17 },
    { month: "Oct", projects: 21 },
    { month: "Nov", projects: 24 },
    { month: "Dec", projects: 26 }
];

// 🔹 Sample SDG Distribution Data (1–15)
const sdgData = [
  { name: "SDG 1 (No Poverty)", value: 8 },
  { name: "SDG 2 (Zero Hunger)", value: 6 },
  { name: "SDG 3 (Good Health)", value: 10 },
  { name: "SDG 4 (Quality Education)", value: 12 },
  { name: "SDG 5 (Gender Equality)", value: 7 },
  { name: "SDG 6 (Clean Water)", value: 14 },
  { name: "SDG 7 (Affordable Energy)", value: 5 },
  { name: "SDG 8 (Decent Work)", value: 4 },
  { name: "SDG 9 (Industry & Innovation)", value: 6 },
  { name: "SDG 10 (Reduced Inequalities)", value: 3 },
  { name: "SDG 11 (Sustainable Cities)", value: 8 },
  { name: "SDG 12 (Responsible Consumption)", value: 9 },
  { name: "SDG 13 (Climate Action)", value: 7 },
  { name: "SDG 14 (Life Below Water)", value: 6 },
  { name: "SDG 15 (Life on Land)", value: 5 },
];

const COLORS = [
  "#5dd3a7", "#3fc083", "#e6b887", "#2fa76f", "#7adbb4",
  "#2fa76f", "#d4a574", "#1a4d35", "#f2d4b3", "#74dab8",
  "#5dd3a7", "#3fc083", "#3fc083", "#2fa76f", "#bdedd9"
];

const Reports = () => {
  const chartRef = useRef(null);

  const downloadChart = async () => {
    const canvas = await html2canvas(chartRef.current);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "dashboard-charts.png";
    link.click();
  };

  return (
    <div className="space-y-10" ref={chartRef}>
      {/* Header & Download */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-semibold text-white">📊 Admin Insights</h4>
        <button
          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          onClick={downloadChart}
        >
          <Download size={18} className="text-gray-300" />
        </button>
      </div>

      {/* 🔹 Project Trend Line Chart */}
      <div className="bg-gray-800/50 rounded-xl p-6 w-full shadow-lg">
        <h5 className="text-xl font-medium text-white mb-4 flex flex-row gap-4 items-center"><BsGraphUp /> Monthly Project Trends</h5>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={projectTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1d2820" />
            <XAxis dataKey="month" stroke="#B8C5BB" />
            <YAxis stroke="#B8C5BB" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#5dd3a7"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 SDG Distribution Pie Chart */}
      <div className="bg-gray-800/50 rounded-xl p-6 w-full shadow-lg pb-14">
        <h5 className="text-xl font-medium text-white mb-4 flex flex-row gap-4 items-center"><GiPieChart /> SDG Distribution (by Focus Area)</h5>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={sdgData}
              cx="50%"
              cy="50%"
              outerRadius={180}
              dataKey="value"
              label={({ name, percent }) =>
                `${name.split(" ")[0]} - ${(percent * 100).toFixed(1)}%`
              }
              labelLine={false}
            >
              {sdgData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
