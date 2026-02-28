import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import type { RealtimeChannel } from "@supabase/supabase-js";

export type NotificationItem = {
  id: string;
  user_id: string | null;
  message: string;
  created_at?: string;
};

type Props = {
  userId: string;
  onNewNotification: (notification: NotificationItem) => void;
};

export const useRealtimeNotifications = ({ userId, onNewNotification }: Props) => {
  useEffect(() => {
    if (!userId) return;

    let channel: RealtimeChannel | null = null;

    try {
      channel = supabase
        .channel("user_notifications_" + userId)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          (payload: { new: NotificationItem }) => {
            const note = payload.new;

            // 🔥 Toast popup!
            toast.info(`🔔 ${note.message}`);

            onNewNotification(note);
          }
        )
        .subscribe();
    } catch (err) {
      console.warn("Realtime connection failed", err);
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [userId, onNewNotification]);
};