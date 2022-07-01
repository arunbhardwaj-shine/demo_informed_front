import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import { BaseUrlImage } from '../../../Api/BaseApi';
import Format1 from './Format1';
import Format2 from './Format2';
import { useEffect } from 'react';
const NewRegistration = () => {
    let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [TemplateIdActive, setTemplateIdActive] = useState();
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
            console.log(resp.data.data?.json_data)
            setData(JSON.parse(resp.data.data?.json_data))
          }else{

            setMessage(resp.data.message)
          }

        }else{
          setMessage()
        }
      });
    };

    useEffect(() => {
      if (localStorage.getItem("registrationPageId")) {
        handleGetRegistrationPagedata()
      } else {
        loader("hide");
        // setMessage("Please create Event");
      }
    }, []);
  return (
    <> 
    {console.log(data)}
    {console.log(mode)}
    {message=="Your both pages are already exist"?<div className="right-sidebar col"><h4>{message}</h4></div>:(
<>
    <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>
    <div className="right-sidebar col">
        {/* top header */}
        <div className="top-header">
            <div className="page-title">
                <h3>Registration Page Form </h3>
            </div>
        </div>
        {/* end of top header */}
        
        {/* Sidebar */}
        <div className="reg-block">
        <div className="reg-sidbar">
            <div onClick={(e) => templateClicked(1,e)}>
                <img value={"virtual"} src={path_image + "content_added1.png"} alt="" className={typeof TemplateIdActive !== "undefined" && TemplateIdActive == "virtual" ? "select_mm": ""} />
                <p>{"Format 1"}</p>
            </div>
            <div onClick={(e) => templateClicked(2,e)} >
                <img value={"onsite"} src={path_image + "content_added1.png"} alt="" className={ typeof TemplateIdActive !== "undefined" && TemplateIdActive == "onsite" ? "select_mm" : ""}/>
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
    )}
    </>
  )
}

export default NewRegistration