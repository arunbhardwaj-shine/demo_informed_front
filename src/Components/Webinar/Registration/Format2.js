import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Modal, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import { BaseUrlImage } from '../../../Api/BaseApi';
import { useNavigate } from 'react-router-dom';

const Format2 = (props) => {
  let navigate=useNavigate();
    const [TemplateIdActive, setTemplateIdActive] = useState(props.TemplateIdActive);
    const [titleLogo, setTitleLogo] = useState(props.data?.titleLogo);
    const [data, setData] = useState();
    const [modalShow, setModalShow] = useState(false);
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
    // console.log(titleLogo)
    const formik = useFormik({
        initialValues: {
          Title1:props.data?.Title1?props.data?.Title1: "",
          Title2:props.data?.Title2?props.data?.Title2: "",
          Title3:props.data?.Title3?props.data?.Title3: "",
          Title4:props.data?.Title4?props.data?.Title4: "",
          mode:props.mode?.mode?props.mode?.mode:'virtual',
          Address:props.data?.Address?props.data?.Address:'',
          Speakername:props.data?.Speakername?props.data?.Speakername:"",
          eventdate:props.data?.eventdate?props.data?.eventdate:'',
          eventtime:props.data?.eventtime?props.data?.eventtime:'',
          content1:props.data?.content1?props.data?.content1:'',
          content2:props.data?.content2?props.data?.content2:'',
          BodyFootercontent1:props.data?.BodyFootercontent1?props.data?.BodyFootercontent1:'',
          BodyFootercontent2:props.data?.BodyFootercontent2?props.data?.BodyFootercontent2:'',
          RadioButton:props.data?.RadioButton?props.data?.RadioButton:'',
          name:props.data?.name?props.data?.name:"",
          country:props.data?.country?props.data?.country:"",
          titleColor:props.data?.titleColor?props.data?.titleColor:"",
          backgroundColor:props.data?.backgroundColor?props.data?.backgroundColor:"",
          anchorText:props.data?.anchorText?props.data?.anchorText:"",
          anchorLink:props.data?.anchorLink?props.data?.anchorLink:"",
          borderColor:props.data?.borderColor?props.data?.borderColor:"",
          textColor:props.data?.textColor?props.data?.textColor:"",
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
            Address:values.Address,
            BodyFootercontent1:values.BodyFootercontent1,
            BodyFooterLeftcontent2:values.BodyFootercontent2,
            Speakername:values.Speakername,
            eventdate:values.eventdate,
            eventtime:values.eventtime,
            RadioButton:values.RadioButton,
            name:values.name,
            countryLabel:values.countryLabel,
            country:values.country,
            anchorText:values.anchorText,
            anchorLink:values.anchorLink,
            titleColor :values.titleColor,
            textColor:values.textColor,
            backgroundColor:values.backgroundColor,
            borderColor:values.borderColor,
            titleLogo:titleLogo
          }
          if(props?.mode?.id){
            ExportApi.RegistrationPageUpdate(props?.mode?.id,localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
              if (resp.ok) {
                if (resp.data.code == 200) {
                  toast.success(resp.data.message)
                  localStorage.removeItem("EditRegistrationPageId")
                  localStorage.removeItem("registrationPageId")
                  setData(resp.data.data)
                  navigate("/webinar/portal/Registrations")
                } else {
                  toast.error(resp.data.message);
                }
                loader("hide")
              }
            });
          }else{

            ExportApi.CreateRegistrationPage(localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
              if (resp.ok) {
                if (resp.data.code == 200) {
                  setData(resp.data.data)
                  toast.success(resp.data.message)
                  navigate("/webinar/portal/Registrations")
                } else {
                  toast.error(resp.data.message);
                }
                loader("hide")
              }
            });
          }
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
    <div className="top-header">
      {props?.data||data?<Button onClick={()=>{loader("show") ;setModalShow(true); setTimeout(() => {
        loader("hide")
      }, 1500);}}>Preview</Button>:null}
            
    </div>
       <form onSubmit={formik.handleSubmit}>
        {/* Middle content */}
        
        <div className="reg-middle-div">  
        <div className="modal-body-content">
        <div className="form-inline row justify-content-between align-items-center"> 
              <div className="form-group col-12">
                <label>Mode</label>
                <div className="form-inline-option">
                  {props.mode?.mode=="virtual"?<div className="form-check">
                 
                 <Form.Label> Virtual</Form.Label>
                 <Form.Control
                  name="mode"
                   type="radio"
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={"virtual"}
                   defaultValue="virtual"
                   defaultChecked
                 />
               </div>:props.mode?.mode=="onsite"?<div className="form-check">
                              <Form.Label>Onsite</Form.Label>
                              <Form.Control
                                 name="mode"
                                 type="radio"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value="onsite"
                                 defaultChecked
                                 />
                            </div>:<div className="form-check"><Form.Label> Virtual</Form.Label>
                              <Form.Control
                               name="mode"
                                type="radio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={"virtual"}
                                defaultChecked
                              />  <Form.Label>Onsite</Form.Label>
                              <Form.Control
                                 name="mode"
                                 type="radio"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value="onsite"
                                 /></div>}
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
                  value={formik.values.Title1}
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
                  value={formik.values.Title2}
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
                  value={formik.values.Title3}
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
              <div className="form-group col-12 ">
                <label>Event Time</label>
                <Form.Control
                  name="eventtime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventtime}
                  type="text"
                  placeholder="Event Time"
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
              <label>Anchor Text</label>
              <Form.Control
                name="anchorText"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.anchorText}
                className="form-control"
              />
           </div>
           </div>      
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Anchor Link</label>
              <Form.Control
                name="anchorLink"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.anchorLink}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div>
           </div>      
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-11">
              <label>Footer Content </label>
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
              <label>Footer Left Content</label>
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
        <div className="email-result">
          <div className="col email-result-block">
          <div  className="email_box_block">
                  <div
                    className={
                      "email_box "+" approved" 
                    }
                  >
                                        <div className="mail-box-content">
                      <div className="mail-box-content-top">
                        <div className="mail-box-content-top-view">
                          <h5>{"Fields"}</h5>
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
                <div className="form-check">
                <Form.Control
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  checked={formik.values.name}
                  type="checkbox"
                />
              </div>
              </div>
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 ">
                <label>Country</label>
                <div className="form-check">
                <Form.Control
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  checked={formik.values.country}
                  type="checkbox"
                />
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        {/* end of fields content */}
        
        {/* color div content */}
        <div  className="reg-color-div">
        <div className="email-result">
          <div className="col email-result-block">
          <div  className="email_box_block">
                  <div
                    className={
                      "email_box "+" approved" 
                    }
                  >
                                        <div className="mail-box-content">
                      <div className="mail-box-content-top">
                        <div className="mail-box-content-top-view">
                          <h5>{"Color"}</h5>
        <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-11">
                      <label>Title</label>
                      <Form.Control
                      name='titleColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.titleColor}
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
                       title="Choose your color"
	                   />
                   </div>
                   </div>
                   </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
        {/* end of color div content */}
        </div>
        {/* end of right sidebar */}
{props.mode?.id?<Button type="submit">Update</Button>: <Button type="submit">Save</Button>}
        
       
        </form>
        <Modal
        show={modalShow}
        id="webinar_event"
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h4>Preview Page </h4>
        </Modal.Header>
        <Modal.Body>
        <iframe src={`${BaseUrlImage}/SH2022/index${data?.format?data?.format:props?.mode?.format}.php?event=${data?.event.code?data?.event.code:props?.mode?.event?.code}&mode=${
                data?.mode?data?.mode:props?.mode?.mode
              }`}></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              // setModalShow1(false);
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   
   </>
  )
}

export default Format2