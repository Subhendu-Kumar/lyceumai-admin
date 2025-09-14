import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
