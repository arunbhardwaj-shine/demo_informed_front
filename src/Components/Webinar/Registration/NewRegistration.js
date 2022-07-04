import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom'
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import Format1 from './Format1';
import Format2 from './Format2';
import { useEffect } from 'react';
const NewRegistration = () => {
    let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [TemplateIdActive, setTemplateIdActive] = useState('1');
    const [data, setData] = useState();
    const [mode, setMode] = useState();
    const [message, setMessage] = useState();
   
const templateClicked = (template, e) => {
      const div = document.querySelector("img.select_mm");
      if (div) {
        div.classList.remove("select_mm");
      }
      setTemplateIdActive(template);
      e.target.classList.toggle("select_mm");
    };
 

    const handleGetRegistrationPagedata = () => {
      ExportApi.RegistrationPageCopyData(localStorage.getItem("registrationPageId")).then((resp) => {
        if (resp.ok&&resp.data.code==200) {
          if(resp.data.data?.json_data){
            setMessage()
            setMode(resp.data.data)
            console.log(resp.data.data)
            setData(JSON.parse(resp.data.data?.json_data))
          }else{
            setMessage(resp.data.message)
          }
        }else{
          setMessage()
        }
      });
    };
    const handleGetRegistrationPageSingleData = () => {
      ExportApi.RegistrationPageSingleData(localStorage.getItem("EditRegistrationPageId")).then((resp) => {
        if (resp.ok&&resp.data.code==200) {
          if(resp.data.data?.json_data){
            setMode(resp.data.data)
            console.log(resp.data.data)
            setData(JSON.parse(resp.data.data?.json_data))
          }
        }
      });
    };
    const location = useLocation();
    useEffect(() => {
      if (localStorage.getItem("registrationPageId")) {
        handleGetRegistrationPagedata()
      } else {
        loader("hide");
        // setMessage("Please create Event");
      }
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

    <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>
    <div className="right-sidebar col">
        {/* top header */}
        <div className="top-header">
          <div className="page-title">
            <h2>Registration Page </h2>
                {/* <h3>Registration Page Form </h3> */}
            </div>
            <Link to="/webinar/portal/Registrations">  <button className="btn btn-primary btn-filled back">
                    <svg
                      width="12"
                      height="19"
                      viewBox="0 0 12 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z"
                        fill="white"
                      />
                    </svg>
                  </button></Link>
        </div>
        {/* end of top header */}
        
        {/* Sidebar */}
        <div className="reg-block">
        <div className="reg-sidbar">
            <div  className={"item" +TemplateIdActive == "1"  ? "select_mm": ""} onClick={(e) => templateClicked(1,e)}>
                <img value={"virtual"} src={path_image + "content_added1.png"} alt="" className={typeof TemplateIdActive !== "undefined" && TemplateIdActive == "1" ? "select_mm": ""} />
                <p>{"Format 1"}</p>
            </div>
            <div  className={"item " +TemplateIdActive == "2"  ? " select_mm":""} onClick={(e) => templateClicked(2,e)} >
                <img value={"onsite"} src={path_image + "content_added1.png"} alt="" className={ typeof TemplateIdActive !== "undefined" && TemplateIdActive == "2" ? "select_mm" : ""}/>
                <p>{"Format 2"}</p>
            </div>
        </div>
        {/* Sidebar */}
        
        <div className="select-mail-template">    
              {TemplateIdActive=="1"?   
            <Format1 TemplateIdActive={TemplateIdActive} data={data} mode={mode} />
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