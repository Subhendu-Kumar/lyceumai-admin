import { BASE_URL, getToken } from "@/lib/utils";
import axios from "axios";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
