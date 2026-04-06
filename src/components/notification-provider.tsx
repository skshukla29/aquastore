"use client";

import { useState, useCallback } from "react";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export type NotificationType = "success" | "error" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </>
  );
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) {
  const bgColor =
    notification.type === "success"
      ? "bg-emerald-50 border-emerald-200"
      : notification.type === "error"
        ? "bg-rose-50 border-rose-200"
        : "bg-blue-50 border-blue-200";

  const textColor =
    notification.type === "success"
      ? "text-emerald-700"
      : notification.type === "error"
        ? "text-rose-700"
        : "text-blue-700";

  const Icon =
    notification.type === "success"
      ? CheckCircle
      : notification.type === "error"
        ? AlertCircle
        : Info;

  const iconColor =
    notification.type === "success"
      ? "text-emerald-600"
      : notification.type === "error"
        ? "text-rose-600"
        : "text-blue-600";

  return (
    <div
      className={`animate-slide-in-up flex gap-3 rounded-lg border px-4 py-3 ${bgColor} shadow-lg`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
      <p className={`flex-1 text-sm font-medium ${textColor}`}>{notification.message}</p>
      <button
        onClick={onClose}
        className={`shrink-0 text-slate-400 hover:text-slate-600`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Hook for using notifications
export function useNotification() {
  // This will be implemented with Context API
  return {
    success: (message: string) => console.log("Success:", message),
    error: (message: string) => console.log("Error:", message),
    info: (message: string) => console.log("Info:", message),
  };
}
