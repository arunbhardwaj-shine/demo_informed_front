import { create } from 'apisauce';
sessionStorage.setItem("user_idsd","demo");
		console.log(sessionStorage.getItem("user_idsd"));
const BaseApi = create({

    baseURL: 'https://webinarapi.shinedezign.pro/api',
    headers: {Authorization: localStorage.getItem("Token")},
});
  const BaseUrlImage = 'https://webinarapi.shinedezign.pro'
export { BaseApi, BaseUrlImage }
