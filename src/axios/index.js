import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// For GET requests
const requestHelper = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW_DESIGN,
  headers: {
    "Content-Type": "application/json",
  },
});

const clearLocalStorageExcept = () => {
	const keysToKeep = ['uname', 'pass']; 
	for (let i = localStorage.length - 1; i >= 0; i--) {
	  const key = localStorage.key(i);
	  if (!keysToKeep.includes(key)) {
		localStorage.removeItem(key);
	  }
	}
}

requestHelper.interceptors.request.use(
  (req) => {
    req.timeout = 600000;
    const token = localStorage.getItem("user_id");
    const jt    = localStorage.getItem("decrypted_token");
    req.headers["token"] = token;
    req.headers["auth"]  = jt;
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
        if(err?.response?.data?.message != "Invalid Credentials! please try again."){
          toast.error(err?.response.data.message)
        }
        break;
      case 401:
        // localStorage.clear();
        clearLocalStorageExcept();
        window.location.href = "/";
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
