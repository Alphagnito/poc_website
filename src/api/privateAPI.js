import axios from "axios";

const privateAPI = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

privateAPI.interceptors.request.use((config) => {
  const appToken = localStorage.getItem("aqua-access-token");
  if (appToken) {
    config.headers.Authorization = `Bearer ${appToken}`;
  }
  return config;
});

export default privateAPI;
