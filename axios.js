import axios from "axios";

export const BASE_URL = "https://travel-app-backend-d6ei.onrender.com";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default http;
