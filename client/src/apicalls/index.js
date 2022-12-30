import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosInstance;
