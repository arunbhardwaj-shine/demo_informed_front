import axios from "./index";

export const postData = (end_point, data) => {
  return axios.post(end_point, data);
};
export const getData = (end_point) => {
  return axios.get(end_point);
};
export const postFormData = (end_point,data,config) => {
  return axios.post(end_point,data,config);
};
export const deleteData = (end_point, user_id) => {
  return axios.delete(end_point + "/" + user_id);
};
export const updateConsent = (end_point, data) => {
  return axios.put(end_point, data);
};
export const resetStats = (end_point, data) => {
  return axios.post(end_point, data);
};
export const updateTags = (end_point, data) => {
  return axios.put(end_point, data);
};
