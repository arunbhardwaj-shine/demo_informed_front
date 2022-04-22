import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";


function ResetPassword() {
    const [err, setErr] = useState(false);
    const formik = useFormik({
      initialValues: {
        old_pass: "",
        new_pass: "",
        confirm_pass : "",
      },
    //   validationSchema: Yup.object({
    //     password: Yup.string()
    //       .max(6, "Must be 7 characters or less")
    //       .required("Enter your password"),
    //     email: Yup.string().email("Invalid email address").required("Enter your email"),
    //   }),
      onSubmit: (values) => {
        ExportApi.ResetPasswordPost(values.old_pass,values.new_pass,values.confirm_pass)
          .then((resp) => {
            //   console.log(resp.data.data[0].token)
            //   console.log(resp.data.data[0].first_name)
            if (resp.data) {
              if (resp.data.code == 200) {
                console.log(resp.data) 
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
    </Col></Row>
  )
}

export default ResetPassword
