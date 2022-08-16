import { create } from 'apisauce';
localStorage.setItem("user_idsd","demo");
		console.log(localStorage.getItem("user_idsd"));
const BaseApi = create({
    //  baseURL: 'http://192.168.0.101:8000/api',
      //  baseURL: 'http://192.168.0.101:8000/api',

      baseURL: 'https://webinarapi.shinedezign.pro/api',
    headers: {Authorization: localStorage.getItem("Token")},
});
  const BaseUrlImage = 'https://webinarapi.shinedezign.pro'
  // const BaseUrlImage = 'http://192.168.0.101:8000'
export { BaseApi, BaseUrlImage }
