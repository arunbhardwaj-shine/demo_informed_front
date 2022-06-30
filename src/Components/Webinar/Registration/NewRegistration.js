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
const NewRegistration = () => {
    let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [TemplateIdActive, setTemplateIdActive] = useState();
   
const templateClicked = (template, e) => {
      const div = document.querySelector("img.select_mm");
      if (div) {
        div.classList.remove("select_mm");
      }
      setTemplateIdActive(template);
      e.target.classList.toggle("select_mm");
    };
 
  return (
    <> 
    <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>
    <div class="right-sidebar col">
        {/* top header */}
        <div class="top-header">
            <div class="page-title">
                <h3>Registration Page Form </h3>
            </div>
        </div>
        {/* end of top header */}
        
        {/* Sidebar */}
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
        
        <section className="select-mail-template">    
              {TemplateIdActive=="1"?   
            <Format1 TemplateIdActive={TemplateIdActive} />
      
                :TemplateIdActive=="2"?
                <Format2 TemplateIdActive={TemplateIdActive} />
               :null}  
          </section>
        
        

     
      </div>
    </>
  )
}

export default NewRegistration