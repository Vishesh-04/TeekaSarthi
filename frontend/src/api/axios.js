// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/", // update if your base URL is different
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
