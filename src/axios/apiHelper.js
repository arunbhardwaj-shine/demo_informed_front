import axios from "./index";

export const postData = (end_point, data) => {
  return axios.post(end_point, data);
};
export const getData = (end_point) => {
  return axios.get(end_point);
};
