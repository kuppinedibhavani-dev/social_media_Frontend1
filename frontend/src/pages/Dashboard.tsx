import PageWrapper from "@/components/layout/PageWrapper";
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Activity, TrendingUp, Users, CalendarDays } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const API_URL = "http://localhost:5000/api";

interface Post {
  id: string;
  platform: string;
  content: string;
  status: string;
  schedule_time?: string;
}

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const token = auth?.token || "";

  const [activities, setActivities] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    engagement: 82,
    followers: 615,
    scheduledPosts: 0,
  });

  /* ---------------------- FETCH POSTS ---------------------- */
  const loadPosts = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/posts/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const posts: Post[] = res.data.posts || [];

      setStats({
        totalPosts: posts.length,
        engagement: 82,
        followers: 615,
        scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
      });

      setActivities(
        posts.map(
          (p) =>
            `Post on ${p.platform} was ${p.status}${
              p.schedule_time ? ` (Scheduled at ${p.schedule_time})` : ""
            }`
        )
      );
    } catch (err) {
      console.error("LOAD POSTS FAILED:", err);
    }
  }, [token]);

  /* ---------------------- INITIAL LOAD ---------------------- */
  useEffect(() => {
    Promise.resolve().then(() => loadPosts()); // FIXES setState in effect warning
  }, [loadPosts]);

  return (
    <PageWrapper>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Welcome Back {auth?.user?.name || "User"} 👋
        </h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Total Posts</h3>
              <Activity className="text-pink-500" />
            </div>
            <p className="text-3xl font-bold dark:text-white">{stats.totalPosts}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Engagement</h3>
              <TrendingUp className="text-orange-500" />
            </div>
            <p className="text-3xl font-bold dark:text-white">{stats.engagement}%</p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Followers</h3>
              <Users className="text-pink-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white">{stats.followers}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Scheduled Posts</h3>
              <CalendarDays className="text-orange-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {stats.scheduledPosts}
            </p>
          </div>
        </div>

        {/* ACTIVITY FEED */}
        <div className="glass-card rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold dark:text-white mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activities.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/40 dark:bg-white/10 
                text-gray-800 dark:text-gray-300 shadow-sm border"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;