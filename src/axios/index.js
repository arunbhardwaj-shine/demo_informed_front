import axios from "axios";
import { toast } from "react-toastify";

// For GET requests
const requestHelper = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW_DESIGN,
  headers: {
    "Content-Type": "application/json",
  },
});

requestHelper.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("user_id");
    req.headers["token"] = token;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// For POST requests
requestHelper.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    switch (err?.response?.status) {
      case 400:
        toast.error(err?.response.data.message)
        break;
      case 500:
        toast.warning(err?.response.data.message)
        break;
      default:
        toast.error(err?.response.data.message)
        break;
    }
    return Promise.reject(err);
  }

);

export default requestHelper;
