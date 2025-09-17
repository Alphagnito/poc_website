import axios from "axios";

const publicAPI = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export default publicAPI;
