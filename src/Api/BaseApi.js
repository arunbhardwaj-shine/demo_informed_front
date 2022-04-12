import { create } from 'apisauce';
const BaseApi = create({
   baseURL: 'http://51.89.210.56:8000/api/',
   headers: {Authorization:localStorage.getItem("Token")},
});
export {
  BaseApi,

}