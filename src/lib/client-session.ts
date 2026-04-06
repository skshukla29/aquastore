"use client";

import { useSyncExternalStore } from "react";
import type { AuthUser } from "@/lib/prototype-types";

export const SESSION_KEY = "aquascore_session";
export const USERS_KEY = "aquascore_users";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

const getServerSnapshot = () => null;

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveSession(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
  window.dispatchEvent(new Event("storage"));
}

export function readStoredUsers(): Array<AuthUser & { password: string }> {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as Array<AuthUser & { password: string }>) : [];
}

export function writeStoredUsers(users: Array<AuthUser & { password: string }>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
