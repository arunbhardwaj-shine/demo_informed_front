import { create } from 'apisauce';
const BaseApi = create({
    //  baseURL: 'http://192.168.0.101:8000/api',
      baseURL: 'https://webinarapi.shinedezign.pro/api',
    headers: {Authorization: localStorage.getItem("Token")},
});
 const BaseUrlImage = 'https://webinarapi.shinedezign.pro'
// const BaseUrlImage = 'http://192.168.0.101:8000'
export { BaseApi, BaseUrlImage }
