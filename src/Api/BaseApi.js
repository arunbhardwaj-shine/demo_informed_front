
import { create } from 'apisauce';



// const BaseApi = create({



//    //baseURL: 'http://lumen.docintel.com:8000/api/',



//    baseURL: 'http://51.89.210.56:8000/api/',



//    headers:{Authorization:localStorage.getItem("Token")},



// });



const BaseApi = create({



   //baseURL: 'http://lumen.docintel.com:8000/api/',



   baseURL: 'http://192.168.0.46:8000/api/',

   // baseURL: 'http://192.168.0.101:8000/api/',



   headers:{Authorization:localStorage.getItem("Token")},

});
 const BaseUrlImage = 'http://192.168.0.46:8000'

// const BaseUrlImage = 'http://192.168.0.101:8000'




export { BaseApi,BaseUrlImage }
