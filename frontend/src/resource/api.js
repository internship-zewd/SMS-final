import axios from "axios";

const api = axios.create({
  baseURL: "https://sms-final.onrender.com", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer your_token", 
  },
});

export default api;
