import { create } from 'apisauce';
var auth = 0;
try{
   auth = localStorage.getItem("Token");
}catch{
   auth = sessionStorage.getItem("Token");
}
const BaseApi = create({
    //  baseURL: 'http://192.168.0.101:8000/api',
      //  baseURL: 'http://192.168.0.101:8000/api',

      baseURL: 'https://webinarapi.shinedezign.pro/api',
    headers: {Authorization: auth},
});
  const BaseUrlImage = 'https://webinarapi.shinedezign.pro'
  // const BaseUrlImage = 'http://192.168.0.101:8000'
export { BaseApi, BaseUrlImage }
