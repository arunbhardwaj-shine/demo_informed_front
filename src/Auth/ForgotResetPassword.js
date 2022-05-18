import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const ForgotResetPassword = () => {
    const [modalShow, setmodalShow] = useState(false);
    const [message, setMessage] = useState(false)
    const [active, setActive] = useState(true)
    const [showPage, setShowPage] = useState(localStorage.getItem("showPage"))
    let parms=useParams()
    console.log(parms)
    let navigate = useNavigate();
// console.log("path",Token)
    const formik = useFormik({
      initialValues: {
        new_pass: "",
        confirm_pass : "",
      },
      validationSchema: Yup.object({
        new_pass: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must contain one symbol, uppercase and one integer value"
        )
          .required("Enter your password"),
        confirm_pass: Yup.string()
        .oneOf([Yup.ref("new_pass"), null], "Passwords must match")
          .min(8, "Must be 8 characters or less")
          .required("Enter your password"),
      }),
      onSubmit: (values) => {
        ExportApi.UserForgotResetPasswordPost(parms.id, values.new_pass,values.confirm_pass)
          .then((resp) => {
            if (resp.data) {
              if (resp.data.code == 200) {
                   localStorage.setItem("showPage",1)
                   setActive(false)
                 
                toast.success(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                  setTimeout(function(){
                    navigate("/webinar")
                  }, 5000);
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
          })
          .catch((err) => console.log(err));
      },
    });
    useEffect(() => {
    if(showPage){
      setActive(false)
      setTimeout(function(){
        navigate("/webinar")
      }, 2000);
    }
    }, [])
  return (
    <div>{active? <>    <Row>
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
  <Col md={{ span: 6, offset: 3 }}>
  <div>
<form onSubmit={formik.handleSubmit}>
    <center>
       <h3>Forgot Password</h3>
    </center>
<hr/>
     <Form.Group className="mb-3">
  <Form.Label>New Password</Form.Label>
  <Form.Control
     id="password"
     name="new_pass"
     type="password"
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.new_pass}
     />
        {formik.touched.new_pass && formik.errors.new_pass ? (
      <div style={{ color: "red" }}>{formik.errors.new_pass}</div>
    ) : null}
  <Form.Label>Confirm Password</Form.Label>
  <Form.Control
     id="password"
     name="confirm_pass"
     type="password"
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.confirm_pass}
     />
        {formik.touched.confirm_pass && formik.errors.confirm_pass ? (
      <div style={{ color: "red" }}>{formik.errors.confirm_pass}</div>
    ) : null}
</Form.Group>
    
    <Button type="submit">Submit</Button>
  </form>
  </div>
  </Col></Row>
  <Modal
     show={modalShow}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body>
        <center><h2 style={{color:"#09a391",fontWeight:"bold",padding:"30px"}}>{message}</h2>
          <Button style={{backgroundColor:"#09a391" ,padding:"20px"}} onClick={()=>{setmodalShow(false);  navigate("/webinar/dashboard");}}>OK</Button>    
        </center>
    </Modal.Body>
  </Modal></>: navigate("/webinar")}
   
    </div>
  )
}

export default ForgotResetPassword