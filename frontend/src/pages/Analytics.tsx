import PageWrapper from "../components/layout/PageWrapper";
import { Card } from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  // ---------- SAMPLE DATA ----------
  const engagementData = [
    { platform: "Instagram", engagement: 4200 },
    { platform: "Facebook", engagement: 3100 },
    { platform: "Twitter", engagement: 1800 },
    { platform: "LinkedIn", engagement: 2500 },
    { platform: "Pinterest", engagement: 1300 },
  ];

  const pieData = [
    { name: "Likes", value: 4321 },
    { name: "Comments", value: 1104 },
    { name: "Shares", value: 892 },
    { name: "Clicks", value: 1540 },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Analytics Overview</h1>

      {/* ----------- METRIC CARDS ----------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h3 className="text-gray-600 dark:text-gray-300">Total Likes</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">4,321</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h3 className="text-gray-600 dark:text-gray-300">Total Comments</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">1,104</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h3 className="text-gray-600 dark:text-gray-300">Total Shares</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">892</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h3 className="text-gray-600 dark:text-gray-300">CTR</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">3.2%</p>
        </Card>
      </div>

      {/* ---------- CHARTS SECTION ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Bar Chart */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Engagement by Platform</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <XAxis dataKey="platform" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ background: "#1f2937", borderRadius: "8px", border: "none" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="engagement" fill="#6366F1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Engagement Breakdown</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {pieData.map((_, index) => (
  <Cell key={index} fill={COLORS[index % COLORS.length]} />
))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1f2937", borderRadius: "8px", border: "none" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </PageWrapper>
  );
};

export default Analytics;