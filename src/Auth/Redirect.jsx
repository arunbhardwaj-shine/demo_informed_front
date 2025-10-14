import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "../loader";


const Redirect = () => {
  // loader("show");
  const navigate = useNavigate();
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const queryData = useRef({})

  useEffect(() => {
    const userIdParam = queryParams.get('user-id');

    if (userIdParam) {
      const userIdMatch = userIdParam.match(/^(\d+)/);
      const codeMatch = userIdParam.match(/codeGo(.*?)type/);
      const typeMatch = userIdParam.match(/type(.*)/);

      const userId = userIdMatch ? userIdMatch[1] : null;
      const code = codeMatch ? codeMatch[1] : null;
      const type = typeMatch ? typeMatch[1] : null;

      console.log("User ID:", userId);
      console.log("Code:", code);
      console.log("Type:", type);

      queryData.current = {
        userId: userId,
        code: code,
        type: type
      };
    } else {
      queryData.current = {
        userId: queryParams.get('user-id')
      };
    }
    myFun();
    login()
  }, []);

  const clearLocalStorageExcept = () => {
    const keysToKeep = ['uname', 'pass', 'acceptedCookies'];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  }

  const login = async () => {
    try{
      
      let body = {
        user_id:  queryData?.current?.userId,
        code: queryData?.current?.code,
      };
      
      const isLogin = await postData(ENDPOINT.ONE_CLICK_LOGIN, body);
      clearLocalStorageExcept();
      localStorage.setItem("user_id", isLogin?.data?.data?.userToken);
      localStorage.setItem("group_id", isLogin?.data?.data?.groupId);
      localStorage.setItem("webinar_flag", isLogin?.data?.data?.webinar_flag);
      localStorage.setItem("name", isLogin?.data?.data?.name);
      localStorage.setItem("decrypted_token", isLogin?.data?.data?.jwtToken);
      if(isLogin?.data?.data?.articleData){
        if(queryData?.current?.type == 'Renew'){
          navigate("/license/renew", {
            state: {data:isLogin?.data?.data?.articleData},
          });
        }else{
          navigate("/license-edit", {
            state: {pdfid:isLogin?.data?.data?.articleData?.id},
          });
        }
      }else{
        if (isLogin?.data?.data?.userToken === "56Ek4feL/1A8mZgIKQWEqg==" || isLogin?.data?.data?.userToken === "HPW6EwQy6v8VrfnMsjz8tg==" || isLogin?.data?.data?.userToken === "bWmUjqX7J011   WUTYn9g==") {
          navigate("/home-timeline")
        } else {
          navigate("/home");
        }
      }
    }catch(err){
      loader("hide");
      console.log(err);
    }
  }
  const myFun = () => {
    loader("show");
  };

  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
    </>
  )
}
export default Redirect
