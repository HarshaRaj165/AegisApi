import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
