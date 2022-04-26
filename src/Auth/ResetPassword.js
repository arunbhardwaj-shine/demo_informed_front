import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
          .max(15, "Old Password Must be 15 characters or less")
          .min(8,"must be at least 8 characters")
          .required("Enter your password"),
          new_pass: Yup.string()
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "password must contain one symbol, uppercase and one integer value"
          )
            .required("Enter your password"),
          confirm_pass: Yup.string()
          .oneOf([Yup.ref("new_pass"), null], "Passwords must match")
            .min(8, "Must be 8 characters or less")
            .required("Enter your password"),
      }),
      onSubmit: (values) => {
        ExportApi.ResetPasswordPost(values.old_pass,values.new_pass,values.confirm_pass)
          .then((resp) => {
            //   console.log(resp.data.data[0].token)
            //   console.log(resp.data.data[0].first_name)
            if (resp.data) {
              if (resp.data.code == 200) {
                console.log(resp.data) 
                setMessage(resp.data.message)
                setmodalShow(true)
                setErr(false)
              }else{
                setErr(true)
                setErr(resp.data.message)
              }
              console.log(err);
            }
          })
          .catch((err) => console.log(err));
      },
    });
  return (
    <Row>
    <Col md={{ span: 6, offset: 3 }}>
    <div>
  <form onSubmit={formik.handleSubmit}>
      <center>
         <h3>Reset Password</h3>
      </center>
<hr/>
       <Form.Group className="mb-3">
    <Form.Label>Old Password</Form.Label>
    <Form.Control  name="old_pass" onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.old_pass} type="password" placeholder="Old Password" />
         {formik.touched.old_pass && formik.errors.old_pass ? (
        <div style={{ color: "red" }}>{formik.errors.old_pass}</div>
      ) : null} 
    <p style={{color:"red"}}>  {err?err:null}</p>
 
     
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
    <p style={{color:"red"}}>  {err?err:null}</p>
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
