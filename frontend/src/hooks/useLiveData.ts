import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export const useLiveData = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    if (!userId) return;

    const [notifRes, statsRes, actRes] = await Promise.all([
      axios.get(`${API}/notifications/${userId}`),
      axios.get(`${API}/stats/${userId}`),
      axios.get(`${API}/activity/${userId}`)
    ]);

    setNotifications(notifRes.data.notifications);
    setStats(statsRes.data);
    setActivities(actRes.data.activities);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  return { notifications, stats, activities };
};