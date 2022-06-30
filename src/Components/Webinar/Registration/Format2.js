import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import { BaseUrlImage } from '../../../Api/BaseApi';

const Format2 = (props) => {
    const [TemplateIdActive, setTemplateIdActive] = useState(props.TemplateIdActive);
    const [footerLogo, setFooterLogo] = useState();
    const [titleLogo, setTitleLogo] = useState();

    const uploadImageTitleLogo=(e)=>{
      let formData = new FormData();
         formData.append("file", e);
      ExportApi.RegistrationPageUplodImage(formData) .then((resp) => {
        if (resp.ok) {
          let Path=BaseUrlImage+resp.data.data
          setTitleLogo(Path)
        }
      });
    }
    const uploadImageFooterLogo=(e)=>{
      let formData = new FormData();
         formData.append("file", e);
      ExportApi.RegistrationPageUplodImage(formData) .then((resp) => {
        if (resp.ok) {
          let Path=BaseUrlImage+resp.data.data
          setFooterLogo(Path)
        }
      });
    }
    const formik = useFormik({
        initialValues: {
          Title1: "",
          Title2: "",
          Title3: "",
          Title4: "",
          mode:'',
          Address:'',
          Speakername:"",
          eventdate:'',
          content1:'',
          content2:'',
          content3:'',
          BodyFootercontent1:'',
          BodyFootercontent2:'',
          RadioButton:'',
          name:"",
          email:"",
          country:'',
          titleColor :"",
          textColor:'',
          backgroundColor:'',
          borderColor:''
        },
    
        enableReinitialize: true,
        onSubmit: (values) => {
          loader("show")
          let jsonData ={
            Title1: values.Title1,
            Title2: values.Title2,
            Title3: values.Title3,
            Title4: values.Title4,
            content1:values.content1,
            content2:values.content2,
            content3:values.content3,
            Address:values.Address,
            BodyFootercontent1:values.BodyFootercontent1,
            BodyFootercontent2:values.BodyFootercontent2,
            Speakername:values.Speakername,
            eventdate:values.eventdate,
            RadioButton:values.RadioButton,
            name:values.name,
            email:values.email,
            country:values.country,
            titleColor :values.titleColor,
            textColor:values.textColor,
            backgroundColor:values.backgroundColor,
            borderColor:values.borderColor,
            footerLogo:footerLogo,
            titleLogo:titleLogo
          }
          ExportApi.CreateRegistrationPage(localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                loader("hide")
                toast.success(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              } else {
                loader("hide")
                toast.error(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          });
        },
      });
  return (
   <>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>
       <form onSubmit={formik.handleSubmit}>
        {/* Middle content */}
        <div className="reg-middle-div">  
        <div className="modal-body-content">
        <div className="form-inline row justify-content-between align-items-center"> 
              <div className="form-group col-12">
                <label>Mode</label>
                <div className="form-inline-option">
                <div class="form-check">
                              <Form.Label> Virtual</Form.Label>
                              <Form.Control
                               name="mode"
                                type="radio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={"virtual"}
                                defaultChecked
                              />
                            </div>
                            <div class="form-check">
                              <Form.Label>Onsite</Form.Label>
                              <Form.Control
                                 name="mode"
                                 type="radio"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value="onsite"
                                 />
                            </div>
                     
                    </div>
                </div>
             </div>
             </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label> Title 1</label>
                <Form.Control
                  name="Title1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 1"
                />
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12">
                <label> Title 2</label>
                <Form.Control
                  name="Title2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 2"
                />
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label> Title 3</label>
                <Form.Control
                  name="Title3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 3"
                />
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label> Title Logo</label>
                <Form.Control
                  name="Headerlogo"
                  onChange={(e)=>{uploadImageTitleLogo(e.target.files[0])}}
                  type="file"
                  placeholder="Header Title Logo"
                />
            </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 ">
                        <label> Footer Logo</label>
                        <Form.Control
                          name="Headerlogo"
                          onChange={(e)=>{uploadImageFooterLogo(e.target.files[0])}}
                          type="file"
                          placeholder="Header Title Logo"
                        />
                    </div>
                    </div>
                  <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label>Address</label>
                      <Form.Control
                        name="Address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Address}
                        className="form-control"
                        placeholder="Address"
                      />
                   </div>
                   </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label>Event Date</label>
                <Form.Control
                  name="eventdate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventdate}
                  type="text"
                  placeholder="Event Date"
                />
            </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Content 1</label>
              <Form.Control
                name="content1"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content1}
                className="form-control"
                placeholder="Content 1"
              />
           </div>
           </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Content 2</label>
              <Form.Control
                name="content2"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content2}
                className="form-control"
                placeholder="Content 2"
              />
           </div>
           </div>      
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Content 3</label>
              <Form.Control
                name="content3"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content3}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div>
           </div>      
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Body Footer Content 1</label>
              <Form.Control
                name="BodyFootercontent1"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BodyFootercontent1}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div>
           </div>      
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Body Footer Content 2</label>
              <Form.Control
                name="BodyFootercontent2"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BodyFootercontent2}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div>
           </div>      
          </div>
         
        {/* end of middle content*/}
        

        {/* right sidebar */}
        <div className="reg-right-sidebar">
        {/* fields content */}
        <div className="reg-fields-div">
        <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 ">
                        <label>Radio Button</label>
                        <div className="form-inline-option">
                        <Form.Control
                          name="RadioButton"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.RadioButton}
                          type="text"
                        />
                      </div>
                    </div>
                    </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label>Name</label>
                <div className="form-inline-option">
                <div class="form-check">
                <Form.Control
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="checkbox"
                />
              </div>
              </div>
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label>Email</label>
                <div class="form-check">
                <Form.Control
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Name}
                  type="checkbox"
                />
                </div>
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label>Country</label>
                <div class="form-check">
                <Form.Control
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  type="checkbox"
                />
                </div>
            </div>
            </div>
        
        </div>
        {/* end of fields content */}
        
        {/* color div content */}
        <div  className="reg-color-div">
        <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label>Title</label>
                      <Form.Control
                      name='titleColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.titleColor}
                       defaultValue="#zwww"
                       title="Choose your color"
	                   />
                   </div>
                   </div>
                <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label>Text</label>
                      <Form.Control
                      name='textColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.textColor}
                       defaultValue="#zwww"
                       title="Choose your color"
	                   />
                   </div>
                   </div>
                <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label >Background</label>
                      <Form.Control
                      name='backgroundColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.backgroundColor}
                       defaultValue="#zwww"
                       title="Choose your color"
	                   />
                   </div>
                   </div>
                <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label >Border</label>
                      <Form.Control
                      name='borderColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.borderColor}
                       defaultValue="#zwww"
                       title="Choose your color"
	                   />
                   </div>
                   </div></div>

        {/* end of color div content */}
        </div>
        {/* end of right sidebar */}
        <Button type="submit">Save</Button>
        </form>
   
   </>
  )
}

export default Format2