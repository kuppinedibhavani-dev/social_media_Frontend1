import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

/* ----------- TYPES ----------- */
interface Notification {
  id: string;
  message: string;
  created_at: string;
}

interface Stats {
  totalPosts: number;
  engagement: number;
  followers: number;
  scheduledPosts: number;
}

interface Activity {
  id: string;
  description: string;
  created_at: string;
}

/* ----------- MAIN HOOK ----------- */
export const useLiveData = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  /* ---- FETCH DATA FUNCTION ---- */
  const fetchData = useCallback(async () => {
    if (!userId) return;

    try {
      const [notifRes, statsRes, actRes] = await Promise.all([
        axios.get(`${API}/notifications/${userId}`),
        axios.get(`${API}/stats/${userId}`),
        axios.get(`${API}/activity/${userId}`),
      ]);

      setNotifications(notifRes.data.notifications || []);
      setStats(statsRes.data || null);
      setActivities(actRes.data.activities || []);
    } catch (error) {
      console.error("LIVE DATA FETCH ERROR:", error);
    }
  }, [userId]);

  /* ---- EFFECT ---- */
  useEffect(() => {
    // Avoid synchronous state updates inside effect
    const timeout = setTimeout(() => {
      fetchData();
    }, 0);

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [fetchData]);

  return { notifications, stats, activities };
};