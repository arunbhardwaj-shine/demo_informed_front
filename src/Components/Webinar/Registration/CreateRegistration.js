import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
const CreateRegistration = (props) => {
    // console.log(props.id)
    const [body, setBody] = useState();
    const [err, setErr] = useState(false);
    const [templateList, setTemplateList] = useState();
    const [image, setimage] = useState("");
    const [errimage, setErrimage] = useState(false);
    const handeleimage = (e) => {
      if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)){
        setErrimage(false)
        let file = e.target.files[0];
        setimage(e.target.files[0]);
       
        if (file) {
            const preview = document.getElementById('imgView');
            const reader = new FileReader();
            reader.addEventListener("load", function () {
            preview.src = reader.result;
            }, false);
            // console.log("profileImg",file)
            reader.readAsDataURL(file);
            }
      }else{
        setErrimage(true)
        setErrimage("Only jpeg, png, jpg, are allowed")
      }
       
     };
     const handleGetTemplateList = (props) => {
      ExportApi.UserTemplateList(props.id).then((resp) => {
        if (resp.ok) {
          setTemplateList(resp.data.data);
        }
      });
    };
    const formik = useFormik({
        initialValues: {
            RegistrationPageTitle:'',
            url :'',
            body:"",
            TemplateId:''
        },
        validationSchema: Yup.object({
          TemplateId: Yup.string().required("Please select template "),
          RegistrationPageTitle: Yup.string().required("Enter your registration page title"),
          body: Yup.string().required("Enter a body text"),
          url: Yup.string()
          .matches(/^[a-zA-Z]+$/u,"Only alphabets are allowed")
          .required("Enter url alias"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
      let formData = new FormData();
      formData.append("event_id",props.id);
      formData.append("body", values.body);
      formData.append("file", image);
      formData.append("title", values.RegistrationPageTitle);
      formData.append("url", values.url);
      formData.append("template_id", values.TemplateId);
      image ? ExportApi.CreateRegistrationPage(formData).then((resp) => {
            if (resp.ok) {
              props.hendletable(props.id)
              if (resp.data.code == 200) {
                  props.data(false)
                toast.success(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              } else {
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
          }):setErrimage("Please update your image");
        },
      });
      useEffect(() => {
        handleGetTemplateList(props)
      }, [])
  return (
    <div>
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
      <Row>
          <form onSubmit={formik.handleSubmit}>
              <Col className="mb-5">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Registration Page Title</Form.Label>
                    <Form.Control
                      name="RegistrationPageTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Subject}
                      type="text"
                      placeholder="Title"
                    />
                         {formik.touched.RegistrationPageTitle && formik.errors.RegistrationPageTitle ? (
                <div style={{ color: "red" }}>{formik.errors.RegistrationPageTitle}</div>
              ) : null}
                  </Form.Group>
                </Col>
              </Col>
              <Col className="mb-5">
                {templateList?<Col>
                  <Form.Group className="mb-3">
                  <Form.Label>Select Template </Form.Label>
                <Form.Select
                  name="TemplateId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.TemplateId}
                  >
                  <option> Select Template</option>
                  {templateList
                    ? templateList?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.id}>{val.name}</option>
                        </React.Fragment>
                      ))
                    : null}
                </Form.Select>
                         {formik.touched.RegistrationPageTitle && formik.errors.RegistrationPageTitle ? (
                <div style={{ color: "red" }}>{formik.errors.RegistrationPageTitle}</div>
              ) : null}
                  </Form.Group>
                </Col>:<Link to="/webinar/template">Please create template</Link>}
                
              </Col>
              <Col className="mb-5">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Url Alias </Form.Label>
                    <Form.Control
                      name="url"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.url}
                      type="text"
                      placeholder="url"
                    />
                    <div>(Url will be like: https://abc.com/event-name/url-alias<br/>
                         Example: https://informed.pro/WFH-2022/virtual-symposium)</div>
                         {formik.touched.url  && formik.errors.url  ? (
                <div style={{ color: "red" }}>{formik.errors.url }</div>
              ) : null}
                  </Form.Group>
                </Col>
              </Col>
              <Row>          
                  <Col xs={6}>
                  <Form.Label>Body Text</Form.Label>
                  <Form.Control as="textarea" rows={12} 
                    name="body"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.body}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    
                  />
                    {formik.touched.body && formik.errors.body ? (
                <div style={{ color: "red" }}>{formik.errors.body}</div>
              ) : null}
                  </Col>
                  
         <Col> <div>
          <img id="imgView" src="" alt="Viewing the registration page image" width={340}/>
    </div></Col>
          </Row>

          <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Choice File</Form.Label>
                <Form.Control
                  name="file"
                  onChange={(e) => {
                    handeleimage(e);
                  }}
                  type="file"
                  size="md"
                />
                 <p style={{color:"red"}}>{errimage}</p>
              </Form.Group>

          <Button type="submit">
            Save
          </Button>
        
      </form> 
        
        
      </Row>
    </div>
  )
}

export default CreateRegistration