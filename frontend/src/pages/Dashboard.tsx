import PageWrapper from "@/components/layout/PageWrapper";
import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { Activity, TrendingUp, Users, CalendarDays } from "lucide-react";
import { useRealtimeNotifications } from "@/hooks/realtime";
import { AuthContext } from "@/context/AuthContext";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const userId: string = auth?.user?.id ?? ""; // ✅ ALWAYS a string — FIXED

  const [activities, setActivities] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    engagement: 0,
    followers: 0,
    scheduledPosts: 0,
  });

  /* ------------------------------------------------------
     1️⃣ FETCH ACTIVITIES
  ------------------------------------------------------ */
  const fetchActivities = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`${API_URL}/activity/${userId}`);
      setActivities(res.data.activities || []);
    } catch (err) {
      console.error("Activity fetch error:", err);
    }
  }, [userId]);

  /* ------------------------------------------------------
     2️⃣ FETCH STATS
  ------------------------------------------------------ */
  const fetchStats = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`${API_URL}/stats/${userId}`);
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }, [userId]);

  /* ------------------------------------------------------
     3️⃣ REALTIME TRACKER (Supabase)
  ------------------------------------------------------ */
  useRealtimeNotifications({
    userId,
    onNewNotification: (notif) => {
      setActivities((prev) => [notif.message, ...prev]);
    },
  });

  /* ------------------------------------------------------
     4️⃣ SAFE useEffect (NO ESLINT WARNINGS)
  ------------------------------------------------------ */
  useEffect(() => {
    if (!userId) return;

    // allow React to finish render before setState → FIXES ESLINT warning
    Promise.resolve().then(() => {
      fetchActivities();
      fetchStats();
    });

    const interval = setInterval(() => {
      fetchActivities();
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, fetchActivities, fetchStats]);

  return (
    <PageWrapper>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Welcome Back {auth?.user?.name ?? "User"} 👋
        </h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Total Posts</h3>
              <Activity className="text-pink-500" />
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {stats.totalPosts}
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Engagement</h3>
              <TrendingUp className="text-orange-500" />
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {stats.engagement}%
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Followers</h3>
              <Users className="text-pink-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {stats.followers}
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">
                Scheduled Posts
              </h3>
              <CalendarDays className="text-orange-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {stats.scheduledPosts}
            </p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="glass-card rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold dark:text-white mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activities.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/40 dark:bg-white/10 text-gray-800 dark:text-gray-300 shadow-sm border"
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