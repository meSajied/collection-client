import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collection-server-n34s.onrender.com"
})

export {axiosInstance}