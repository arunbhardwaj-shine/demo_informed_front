import { create } from 'apisauce';
const BaseApi = create({
    baseURL: 'https://webinarapi.shinedezign.pro/api',
    headers: {Authorization: localStorage.getItem("Token")},
});
const BaseUrlImage = 'https://webinarapi.shinedezign.pro'
export { BaseApi, BaseUrlImage }
