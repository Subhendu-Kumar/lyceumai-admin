import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("accessToken", token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("accessToken");
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accessToken");
  }
};

export const formatDateTime = (dateString?: string | null): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleString("en-IN", {
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    weekday: "short",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMessageFromError = (error: any): string => {
  const message =
    error.response?.data?.detail || error.message || "Something went wrong";
  return message;
};
