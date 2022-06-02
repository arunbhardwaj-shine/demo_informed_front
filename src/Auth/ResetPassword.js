import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function ResetPassword() {
    const [err, setErr] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
    const [message, setMessage] = useState(false);
    let navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        old_pass: "",
        new_pass: "",
        confirm_pass : "",
      },
      validationSchema: Yup.object({
        old_pass: Yup.string()
          .min(8,"Password must be 8 characters long")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password must contain one symbol, uppercase and one integer value"
          )
          .required("Enter your old password"),
          new_pass: Yup.string()
          .min(8,"Password must be 8 characters long")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password must contain one symbol, uppercase and one integer value"
          )
            .required("Enter your new password"),
          confirm_pass: Yup.string()
          .oneOf([Yup.ref("new_pass"), null], "Confirm and new password should be same")
            .min(8, "Password must be 8 characters long")
            .required("Enter your confirm  password"),
      }),
      onSubmit: (values) => {
        ExportApi.ResetPasswordPost(values.old_pass,values.new_pass,values.confirm_pass)
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
                  setTimeout(function(){
                    navigate("/webinar/dashboard")
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
  return (
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
    <Form.Label> Enter old password</Form.Label>
    <Form.Control  name="old_pass" onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.old_pass} type="password" placeholder="Old Password" />
         {formik.touched.old_pass && formik.errors.old_pass ? (
        <div style={{ color: "red" }}>{formik.errors.old_pass}</div>
      ) : null} 
    <p style={{color:"red"}}>  {err?err:null}</p>
    <Form.Label>Enter new password</Form.Label>
    <Form.Control
       id="password"
       name="new_pass"
       type="password"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       placeholder="New Password"
       value={formik.values.new_pass}
       />
          {formik.touched.new_pass && formik.errors.new_pass ? (
        <div style={{ color: "red" }}>{formik.errors.new_pass}</div>
      ) : null}
    <p style={{color:"red"}}>  {err?err:null}</p>
    <Form.Label>Enter confirm password</Form.Label>
    <Form.Control
       id="password"
       name="confirm_pass"
       type="password"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       placeholder="Confirm Password"
       value={formik.values.confirm_pass}
       />
          {formik.touched.confirm_pass && formik.errors.confirm_pass ? (
        <div style={{ color: "red" }}>{formik.errors.confirm_pass}</div>
      ) : null}
    <p style={{color:"red"}}>  {err?err:null}</p>
  </Form.Group>
      <Button type="submit">Submit</Button>
    </form>
    </div>
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
    </Col></Row>
  )
}

export default ResetPassword
