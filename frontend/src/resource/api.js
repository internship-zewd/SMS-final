import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/", 
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer your_token", 
  },
});

export default api;
