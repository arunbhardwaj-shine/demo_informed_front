import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom'
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import Format1 from './Format1';
import Format2 from './Format2';
import { useEffect } from 'react';
import { BaseUrlImage } from '../../../Api/BaseApi';
import { format } from 'highcharts';
const NewRegistration = () => {
    let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    let path_imagee = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [TemplateIdActive, setTemplateIdActive] = useState(1);
    const [data, setData] = useState();
    const [mode, setMode] = useState();
    const [message, setMessage] = useState();
    const [render, setRender] = useState(1);

   
const templateClicked = (template, e) => {

      // const div = document.querySelector("img.select_mm");
      // if (div) {
      //   div.classList.remove("select_mm");
      // }
      setTemplateIdActive(template);
      // e.target.classList.toggle("select_mm");

    };
 
    const handleGetRegistrationPageSingleData = () => {
      ExportApi.RegistrationPageSingleData(localStorage.getItem("EditRegistrationPageId")).then((resp) => {
        if (resp.ok&&resp.data.code==200) {
          setMode(resp.data.data)
          if(resp.data.data?.json_data){
            setTemplateIdActive(resp.data.data.format)
            setRender(render+2)
             console.log("nisdnsidnsidhsidhsih",resp.data.data)
            setData(JSON.parse(resp.data.data?.json_data))
          }
        }
      });
    };
 
    const Format = (temp) => {
      ExportApi.RegistrationPageUpdate(localStorage.getItem("EditRegistrationPageId"),localStorage.getItem("EventIdHeader"),mode?.mode, JSON.stringify(data),temp).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
             console.log(resp.data)
          } else {
            // toast.error(resp.data.message);
          }
          // loader("hide")
        }
      });
    };
    const location = useLocation();
    useEffect(() => {
      handleGetRegistrationPageSingleData()
    if(localStorage.getItem("EditRegistrationPageId")){
      handleGetRegistrationPageSingleData()
    }else{
      console.log("error")
    }
    if (location.pathname !== "/webinar/portal/NewRegistration") {
      localStorage.removeItem("EditRegistrationPageId")
    }
    }, []);
  return (
    <> 
    <div className="right-sidebar col">
        {/* top header */}
        <div className="top-header">
          <div className="page-title">
              <Link className='back-button' to="/webinar/portal/Registrations">  <button onClick={()=>{ localStorage.removeItem("EditRegistrationPageId");
                  localStorage.removeItem("registrationPageId")}} className="btn btn-primary btn-filled back">
                  Back
                  </button>
                </Link>
          </div>
              <div className="reg-sidbar">
                {/* {  alert(TemplateIdActive==1?"select-sm img":"img.select_mm")} */}
                  <div  className={TemplateIdActive=="2"?"select-sm img":""} onClick={(e) => {templateClicked(2,e);Format(2)}} >
                      <img  className={TemplateIdActive=="2"?"reg-sidbar-img select_mm":"reg-sidbar-img "} value={"onsite"} src={path_imagee + "format2.png"} alt="Format-2" />
                      <p>{"Format 1"}</p>
                  </div>
                  <div  className={TemplateIdActive=="1"?"select-sm img":""} onClick={(e) => {templateClicked(1,e);Format(1)}}>
                      <img  className={TemplateIdActive=="1"?"reg-sidbar-img select_mm":"reg-sidbar-img "} value={"virtual"} src={path_imagee + "format1.png"} alt="Format-1"  />
                      <p>{"Format 2"}</p>
                  </div>
              </div>
           
        {console.log("data",data)}
             <a target="_blank" href={`${BaseUrlImage}/SH2022/index${TemplateIdActive}.php?event=${mode?.event?.code}&mode=${
               mode?.mode?mode?.mode:"virtual"
              }`}><button className="btn btn-primary btn-filled">Link</button></a>
        </div>
  
        {/* end of top header */}
        
        {/* Sidebar */}
        <div className="reg-block">
      
        {/* Sidebar */}
        {/* {console.log(data)} */}
        <div className="select-mail-template">    
              {TemplateIdActive=="1"?   
            <Format1  TemplateIdActive={TemplateIdActive} data={data} mode={mode} />
                :TemplateIdActive=="2"?
                <Format2 TemplateIdActive={TemplateIdActive} data={data} mode={mode} />
               :null}  
        </div>
          </div>

      </div>

    </>
  )
}

export default NewRegistration