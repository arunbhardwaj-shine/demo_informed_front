import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const ForgotResetPassword = () => {
    const [modalShow, setmodalShow] = useState(false);
    const [message, setMessage] = useState(false);
    let Id = window.location.pathname;
    const Token = Id.substring(31);
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
        ExportApi.UserForgotResetPasswordPost(Token,values.new_pass,values.confirm_pass)
          .then((resp) => {
            if (resp.data) {
              if (resp.data.code == 200) {
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
          })
          .catch((err) => console.log(err));
      },
    });
  return (
    <div>
        <Row>
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
         <h3>Reset Password</h3>
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
    </Modal>
    </div>
  )
}

export default ForgotResetPassword