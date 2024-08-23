import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collection-server-n34s.onrender.com"
  //baseURL: "http://localhost:8080"
})

export {axiosInstance}