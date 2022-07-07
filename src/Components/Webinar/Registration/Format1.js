import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Row ,Modal} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import { BaseUrlImage } from '../../../Api/BaseApi';
import { useNavigate } from 'react-router-dom';

const Format1 = (props) => {
  let navigate=useNavigate();
  const [TemplateIdActive, setTemplateIdActive] = useState(props.TemplateIdActive);
  // console.log("titleLogo",props.data?.titleLogo)
  const [titleLogo, setTitleLogo] = useState();
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

  const formik = useFormik({
      initialValues: {
        Title1:props.data?.Title1?props.data?.Title1: "",
        Title2:props.data?.Title2?props.data?.Title2: "",
        Title3:props.data?.Title3?props.data?.Title3: "",
        mode:props.mode?.mode?props.mode?.mode:'virtual',
        Speakername:props.data?.Speakername?props.data?.Speakername:'',
        eventtime:props.data?.eventtime?props.data?.eventtime:'',
        eventdate:props.data?.eventdate?props.data?.eventdate:'',
        content1:props.data?.content1?props.data?.content1:'',
        content2:props.data?.content2?props.data?.content2:'',
        content3:props.data?.content3?props.data?.content3:'',
        consenttext:props.data?.consenttext?props.data?.consenttext:'',
        consentRadiotext1:props.data?.consentRadiotext1?props.data?.consentRadiotext1:'',
        consentRadiotext2:props.data?.consentRadiotext2?props.data?.consentRadiotext2:'',
        consentRadiotext3:props.data?.consentRadiotext3?props.data?.consentRadiotext3:'',
        name:props.data?.name?props.data?.name:"",
        country:props.data?.country?props.data?.country:"",
        titleColor:props.data?.titleColor?props.data?.titleColor:"",
        backgroundColor:props.data?.backgroundColor?props.data?.backgroundColor:"",
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
          consenttext :values.consenttext,
          consentRadiotext1:values.consentRadiotext1,
          consentRadiotext2:values.consentRadiotext2,
          consentRadiotext3:values.consentRadiotext3,
          content1:values.content1,
          content2:values.content2,
          content3:values.content3,
          Speakername:values.Speakername,
          eventdate:values.eventdate,
          eventtime:values.eventtime,
          name:values.name,
          country:values.country,
          titleColor :values.titleColor,
          textColor:values.textColor,
          backgroundColor:values.backgroundColor,
          borderColor:values.borderColor,
          titleLogo:titleLogo?titleLogo:props.data?.titleLogo
        }
        if(props?.mode?.id){
          ExportApi.RegistrationPageUpdate(props?.mode?.id,localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
          if (resp.ok) {
            if (resp.data.code == 200) {
              toast.success(resp.data.message)
              localStorage.removeItem("EditRegistrationPageId")
              localStorage.removeItem("registrationPageId")
              setData(resp.data.data)
              setTimeout(() => { 
                navigate("/webinar/portal/Registrations")
              }, 1500);
            } else {
              toast.error(resp.data.message);
            }
            loader("hide")
          }
        });
      }else{
        ExportApi.CreateRegistrationPage(localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
          if (resp.ok&&resp.data.code == 200) {
              if(resp.data.message=="Your page with this mode is already exist"){
                toast.error(resp.data.message);
              }
              else {
                toast.success(resp.data.message)      
               setTimeout(() => {
                 navigate("/webinar/portal/Registrations")
               }, 1500);
              }
              setData(resp.data.data)
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
                   defaultChecked
                   defaultValue="virtual"
                 />
               </div>:props.mode?.mode=="onsite"?<div className="form-check">
                              <Form.Label>Onsite</Form.Label>
                              <Form.Control
                                 name="mode"
                                 type="radio"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 defaultChecked
                                 defaultValue={"onsite"}
                                 value="onsite"
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
                        <label>Speaker Name </label>
                        <Form.Control
                          name="Speakername"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.Speakername}
                          type="text"
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
              <label>Content 3</label>
              <Form.Control
                name="content3"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content3}
                className="form-control"
                placeholder="Content 3"
              />
           </div>
           </div>                      
          <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12  col-md-11">
                        <label>Consent Text</label>
                        <Form.Control
                          name="consenttext"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.consenttext}
                          type="text"
                        />
                    </div>
                    </div>
                    {formik.values.consenttext?<>
                      <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12  col-md-11">
                        <label>consent Radio Text 1</label>
                        <Form.Control
                          name="consentRadiotext1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.consentRadiotext1}
                          type="text"
                        />
                    </div>
                    </div>
          <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12  col-md-11">
                        <label>consent Radio text 2</label>
                        <Form.Control
                          name="consentRadiotext2"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.consentRadiotext2}
                          type="text"
                        />
                    </div>
                    </div>
          <div className="form-inline row justify-content-between align-items-center">
                      <div className="form-group col-12  col-md-11">
                        <label>consent Radio Text 3</label>
                        <Form.Control
                          name="consentRadiotext3"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.consentRadiotext3}
                          type="text"
                        />
                    </div>
                    </div>
                    </>:null}

         
        {/* end of middle content*/}
        

      

        {/* end of color div content */}
        </div>
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
        {/* end of right sidebar */}{props?.mode?.id?
<Button type="submit">update</Button>:
        <Button type="submit">Save</Button>
        }
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
            <iframe src={`${BaseUrlImage}/SH2022/index${data?.format?data?.format:props?.mode?.format}.php?event=${data?.event.code?data?.event.code:props.mode?.event?.code}&mode=${
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

export default Format1