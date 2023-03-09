import axios from "axios";

// For GET requests
const requestHelper = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW_DESIGN,
  headers: {
    "Content-Type": "application/json",
  },
});

requestHelper.interceptors.request.use(
  (req) => {
    // const token = localStorage.getItem("loginToken");
    // req.headers["Authorization"] = token;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// For POST requests
requestHelper.interceptors.response.use(
  (res) => {
    if (res.status === 201 || res.status === 200) {
      // console.log("Posted Successfully");
    }
    return res;
  },
  (err) => {
    switch (err?.response?.status) {
      case 401:
        // logout();
        // window.location.href = "/login";
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

export default requestHelper;
