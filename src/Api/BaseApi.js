import { create } from 'apisauce';
const BaseApi = create({
   //baseURL: 'http://lumen.docintel.com:8000/api/',
   baseURL: 'http://51.89.210.56:8000/api/',
   headers:{Authorization:localStorage.getItem("Token")},
});
export {
  BaseApi,
}