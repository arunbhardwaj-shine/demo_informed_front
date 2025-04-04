import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// For GET requests
const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW,
  headers: {
    "Content-Type": "application/json",
  },
});

const clearLocalStorageExcept = () => {
	const keysToKeep = ['uname', 'pass', 'acceptedCookies']; 
	for (let i = localStorage.length - 1; i >= 0; i--) {
	  const key = localStorage.key(i);
	  if (!keysToKeep.includes(key)) {
		localStorage.removeItem(key);
	  }
	}
}

instanceAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// For POST requests
instanceAxios.interceptors.response.use(
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

export default instanceAxios;
