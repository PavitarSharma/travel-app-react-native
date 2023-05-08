import axios from "axios";

export const BASE_URL = "http://192.168.43.179:3000";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default http;
