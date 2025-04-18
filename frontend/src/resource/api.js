import axios from "axios";

const baseUrl=process.env.REACT_APP_BASE_URL
const api = axios.create({
  baseURL: baseUrl, 
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer your_token", 
  },
});

export default api;
